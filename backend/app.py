from flask import Flask, send_from_directory
from flask_cors import CORS

# Import route blueprints
from route.userdetail import user_details
from route.productpage import product_detail
from route.addtocart import add_to_cart
from route.orderpage import order_api

app = Flask(__name__, static_url_path='/static', static_folder='static')
CORS(app)

# Register route blueprints
app.register_blueprint(user_details)
app.register_blueprint(product_detail)
app.register_blueprint(add_to_cart)
app.register_blueprint(order_api)

# ✅ Route to serve uploaded product images
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('static/uploads', filename)

if __name__ == '__main__':
    app.run(debug=True)
