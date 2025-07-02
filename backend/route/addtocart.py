from flask import Blueprint, request, jsonify
import mysql.connector
from flask_cors import CORS

add_to_cart = Blueprint('add_to_cart', __name__)
CORS(add_to_cart)

# ---------------- DATABASE CONNECTION ---------------- #
def db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='product'
    )

# ---------------- ADD PRODUCT TO CART ---------------- #
@add_to_cart.route('/cart', methods=['POST'])
def add_product_to_cart():
    data = request.get_json()
    productid = data.get('productid')

    if not productid:
        return jsonify({'error': 'Product ID is required'}), 400

    conn = db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT stock FROM productpage WHERE productid = %s", (productid,))
    product = cursor.fetchone()
    if not product:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Invalid Product ID'}), 400

    # Only add if not already in cart
    cursor.execute("SELECT * FROM cart WHERE productid = %s", (productid,))
    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Product already in cart'}), 200
    else:
        cursor.execute("INSERT INTO cart (productid) VALUES (%s)", (productid,))

    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Product added to cart'}), 201

# ---------------- GET ALL CART ITEMS ---------------- #
@add_to_cart.route('/cart', methods=['GET'])
def get_all_cart_items():
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            cart.cartid,
            cart.productid,
            productpage.name,
            productpage.price,
            productpage.image,
            productpage.description
        FROM cart
        JOIN productpage ON cart.productid = productpage.productid
    """)
    cart_items = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(cart_items if cart_items else []), 200

# ---------------- DELETE ITEM FROM CART ---------------- #
@add_to_cart.route('/cart/<int:productid>', methods=['DELETE'])
def delete_product_from_cart(productid):
    conn = db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM cart WHERE productid = %s", (productid,))
    conn.commit()

    cursor.close()
    conn.close()
    return jsonify({'message': f'Product {productid} removed from cart'}), 200
