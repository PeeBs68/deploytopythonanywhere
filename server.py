# Flask Server
# author: Phelim Barry

from flask import Flask, url_for, request, redirect, abort, jsonify
from carsrus_dao import carsiteDAO

app = Flask(__name__, static_url_path='', static_folder='.')

@app.route('/')
def index():
    return("Hello there")

# Get all cars
@app.route('/carsrus', methods = ['GET'])
def getAll():
    return jsonify(carsiteDAO.getAll())
    # return("Get all")


# Get car by ID
@app.route('/carsrus/<int:id>', methods = ['GET'])
def findbyid(id):
    return jsonify(carsiteDAO.findByID(id))
    # return(f"Find by ID {id}")

# Create a car
@app.route('/carsrus', methods = ['POST'])
def create():
    # read JSON...need to test this using POSTMAN so as to add the details in JSON format
    jsonstring = request.json
    car = {}
    
    # Check for valid values
    if "make" not in jsonstring:
        abort(401)
    car["make"] = jsonstring["make"]
    if "model" not in jsonstring:
        abort(401)
    car["model"] = jsonstring["model"]
    if "price" not in jsonstring:
        abort(401)
    car["price"] = jsonstring["price"]
    if "colour" not in jsonstring:
        abort(401)
    car["colour"] = jsonstring["colour"]
    if "kilometers" not in jsonstring:
        abort(401)
    car["kilometers"] = jsonstring["kilometers"]
    if "fun_factor" not in jsonstring:
        abort(401)
    car["fun_factor"] = jsonstring["fun_factor"]

    return(jsonify(carsiteDAO.create(car)))

# Update a car
@app.route('/carsrus/<int:id>', methods = ['PUT'])
def update(id):
    # read JSON...need to test this using POSTMAN so as to add the details in JSON format
    jsonstring = request.json

    jsonstring = request.json
    car = {}

# Note to self - put in some error checking of values entered/being updated
    if "make" in jsonstring:
        car["make"] = jsonstring["make"]
    if "model" in jsonstring:
        car["model"] = jsonstring["model"]
    if "price" in jsonstring:
        car["price"] = jsonstring["price"]
    if "colour" in jsonstring:
        car["colour"] = jsonstring["colour"]
    if "kilometers" in jsonstring:
        car["kilometers"] = jsonstring["kilometers"]
    if "fun_factor" in jsonstring:
        car["fun_factor"] = jsonstring["fun_factor"]
    return(jsonify(carsiteDAO.update(id, car)))


# Delete a car
@app.route('/carsrus/<int:id>', methods = ['DELETE'])
def delete(id):
    return jsonify(carsiteDAO.delete(id))


if __name__ == "__main__":
    app.run(debug=True)

