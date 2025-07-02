from flask import Blueprint, request, jsonify
import mysql.connector
from flask_cors import CORS
import bcrypt

user_details = Blueprint('user_details', __name__)
CORS(user_details)

# ---------------- DATABASE CONNECTION ---------------- #
def db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='product'
    )

# ---------------- CREATE USER ---------------- #
@user_details.route('/user', methods=['POST'])
def create_userdetail():
    try:
        data = request.get_json()
        username = data.get('username')
        emailid = data.get('emailid', '').lower()
        password = data.get('password')

        if not username or not emailid or not password:
            return jsonify({'error': 'Missing required fields'}), 400

        conn = db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM userdetails WHERE emailid = %s", (emailid,))
        if cursor.fetchone():
            return jsonify({'error': 'Email already registered'}), 409

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        cursor.execute("""
            INSERT INTO userdetails (username, emailid, password)
            VALUES (%s, %s, %s)
        """, (username, emailid, hashed_password))

        conn.commit()
        userid = cursor.lastrowid
        return jsonify({'message': 'User created successfully', 'userid': userid}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ---------------- USER LOGIN ---------------- #
@user_details.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        emailid = data.get('emailid', '').lower()
        password = data.get('password')

        if not emailid or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        conn = db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM userdetails WHERE emailid = %s", (emailid,))
        user = cursor.fetchone()

        if not user or not user.get('password'):
            return jsonify({'error': 'Invalid email or password'}), 401

        stored_password = user['password'].encode('utf-8')
        if not bcrypt.checkpw(password.encode('utf-8'), stored_password):
            return jsonify({'error': 'Invalid email or password'}), 401

        return jsonify({
            'message': 'Login successful',
            'userid': user['userid'],
            'name': user['username']  # ✅ included for frontend
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ---------------- GET ALL USERS ---------------- #
@user_details.route('/user', methods=['GET'])
def view_userdetail():
    try:
        conn = db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT userid, username, emailid FROM userdetails")
        users = cursor.fetchall()
        return jsonify(users) if users else jsonify({'message': 'No users found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ---------------- GET SINGLE USER ---------------- #
@user_details.route('/user/<int:userid>', methods=['GET'])
def single_user(userid):
    try:
        conn = db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT userid, username, emailid FROM userdetails WHERE userid = %s", (userid,))
        user = cursor.fetchone()
        return jsonify(user) if user else jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ---------------- UPDATE USER ---------------- #
@user_details.route('/user/<int:userid>', methods=['PUT'])
def update_user_detail(userid):
    try:
        data = request.get_json()
        username = data.get('username')
        emailid = data.get('emailid', '').lower()
        password = data.get('password')

        if not username or not emailid or not password:
            return jsonify({'error': 'Missing required fields'}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        conn = db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE userdetails
            SET username = %s, emailid = %s, password = %s
            WHERE userid = %s
        """, (username, emailid, hashed_password, userid))

        conn.commit()
        return jsonify({'message': 'User details updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ---------------- DELETE USER ---------------- #
@user_details.route('/user/<int:userid>', methods=['DELETE'])
def delete_account(userid):
    try:
        conn = db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM userdetails WHERE userid = %s", (userid,))
        conn.commit()
        return jsonify({'message': f'User with id {userid} deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
