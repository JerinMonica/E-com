from flask import Blueprint, request, jsonify
import mysql.connector
from flask_cors import CORS

order_api = Blueprint('order_api', __name__)
CORS(order_api)

# ---------------- DATABASE CONNECTION ---------------- #
def db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='product'
    )

# ---------------- PLACE ORDER ---------------- #
@order_api.route('/order', methods=['POST'])
def place_order():
    data = request.get_json()
    userid = data.get('userid')
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')  # ✅ NEW FIELD
    address = data.get('address')
    city = data.get('city')
    country = data.get('country', 'India')
    payment_method = data.get('payment_method', 'COD')
    payment_status = data.get('payment_status', 'Pending')
    items = data.get('items', [])

    # ✅ Validation
    if not all([userid, name, email, phone, address, city, country, items]):
        return jsonify({'error': 'Missing required fields'}), 400

    conn = db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Step 1: Validate stock
        for item in items:
            productid = item.get('productid')
            quantity = item.get('quantity', 1)

            cursor.execute("SELECT stock FROM productpage WHERE productid = %s", (productid,))
            product = cursor.fetchone()

            if not product:
                conn.close()
                return jsonify({'error': f'❌ Product ID {productid} not found.'}), 404

            if product['stock'] < quantity:
                conn.close()
                return jsonify({'error': f'⚠️ Not enough stock for {item["name"]}. Only {product["stock"]} available.'}), 400

        # Step 2: Insert into orders table
        cursor.execute("""
            INSERT INTO orders (userid, name, email, phone, address, city, country, payment_method, payment_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (userid, name, email, phone, address, city, country, payment_method, payment_status))
        orderid = cursor.lastrowid

        # Step 3: Insert items and reduce stock
        for item in items:
            productid = item['productid']
            productname = item['name']
            quantity = item['quantity']
            price = item['price']

            cursor.execute("""
                INSERT INTO order_items (orderid, productid, productname, quantity, price)
                VALUES (%s, %s, %s, %s, %s)
            """, (orderid, productid, productname, quantity, price))

            cursor.execute("""
                UPDATE productpage SET stock = stock - %s WHERE productid = %s
            """, (quantity, productid))

        conn.commit()
        return jsonify({'message': '✅ Order placed successfully', 'orderid': orderid}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ---------------- VIEW ORDERS FOR A USER ---------------- #
@order_api.route('/orders/<int:userid>', methods=['GET'])
def get_user_orders(userid):
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT orderid, name, email, phone, address, city, country, payment_method, payment_status
            FROM orders WHERE userid = %s ORDER BY orderid DESC
        """, (userid,))
        orders = cursor.fetchall()

        for order in orders:
            cursor.execute("SELECT * FROM order_items WHERE orderid = %s", (order['orderid'],))
            order['items'] = cursor.fetchall()

        return jsonify(orders), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
