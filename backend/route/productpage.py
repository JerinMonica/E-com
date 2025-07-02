from flask import Blueprint, request, jsonify
import mysql.connector
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

product_detail = Blueprint('product_detail', __name__)
CORS(product_detail)

# ---------- CONFIG ---------- #
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'}

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------- DB CONNECTION ---------- #
def db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='product'
    )

# ---------- HELPER ---------- #
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ---------- CREATE PRODUCT OR UPDATE STOCK IF EXISTS ---------- #
@product_detail.route('/products', methods=['POST'])
def create_product():
    name = request.form.get('name')
    price = float(request.form.get('price', 0))
    stock = int(request.form.get('stock', 0))
    description = request.form.get('description')
    category = request.form.get('category')

    image_file = request.files.get('image')
    if not image_file or not allowed_file(image_file.filename):
        return jsonify({'error': 'Invalid or missing image'}), 400

    filename = secure_filename(image_file.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image_file.save(image_path)
    image_name = filename

    conn = db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT productid, stock FROM productpage WHERE image = %s", (image_name,))
    existing = cursor.fetchone()

    if existing:
        productid, existing_stock = existing
        new_stock = existing_stock + stock
        cursor.execute("UPDATE productpage SET stock = %s WHERE productid = %s", (new_stock, productid))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Stock updated for existing product', 'productid': productid}), 200
    else:
        cursor.execute("""
            INSERT INTO productpage (name, price, stock, image, description, category)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, price, stock, image_name, description, category))
        conn.commit()
        product_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'New product created', 'product_id': product_id}), 201

# ---------- GET ALL PRODUCTS ---------- #
@product_detail.route('/products', methods=['GET'])
def get_products():
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT productid, name, price, stock, image, description, category FROM productpage")
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products), 200

# ---------- GET PRODUCT BY ID ---------- #
@product_detail.route('/products/<int:productid>', methods=['GET'])
def get_product(productid):
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT productid, name, price, stock, image, description, category FROM productpage WHERE productid = %s", (productid,))
    product = cursor.fetchone()
    cursor.close()
    conn.close()
    if product:
        return jsonify(product), 200
    return jsonify({'error': 'Product not found'}), 404

# ---------- UPDATE PRODUCT ---------- #
@product_detail.route('/products/<int:productid>', methods=['PUT'])
def update_product(productid):
    name = request.form.get('name')
    price = float(request.form.get('price', 0))
    stock = int(request.form.get('stock', 0))
    description = request.form.get('description')
    category = request.form.get('category')

    image_file = request.files.get('image')
    image_name = None

    if image_file and allowed_file(image_file.filename):
        filename = secure_filename(image_file.filename)
        image_file.save(os.path.join(UPLOAD_FOLDER, filename))
        image_name = filename

    conn = db_connection()
    cursor = conn.cursor()

    if image_name:
        cursor.execute("""
            UPDATE productpage 
            SET name=%s, price=%s, stock=%s, image=%s, description=%s, category=%s
            WHERE productid=%s
        """, (name, price, stock, image_name, description, category, productid))
    else:
        cursor.execute("""
            UPDATE productpage 
            SET name=%s, price=%s, stock=%s, description=%s, category=%s
            WHERE productid=%s
        """, (name, price, stock, description, category, productid))

    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Product updated'}), 200

# ---------- DELETE PRODUCT ---------- #
@product_detail.route('/products/<int:productid>', methods=['DELETE'])
def delete_product(productid):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM productpage WHERE productid = %s", (productid,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Product deleted'}), 200
