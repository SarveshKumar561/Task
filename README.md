# Product Management System

This is a simple RESTful API for managing products and calculating the final price based on discounts and charges. It is built using Node.js, Express.js, and MongoDB.

## Prerequisites

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository:

```bash
git clone <https://github.com/sarveshmishra561999/Task.git>
```

2. Install dependencies:

```bash
cd product-management-system
npm install
```

3. Configure the MongoDB connection:

- Open `server.js` file
- Locate the following line:
```javascript
mongoose.connect('mongodb://localhost/productsDB', {
```
- Replace `'mongodb://localhost/productsDB'` with the appropriate MongoDB connection string for your setup.

4. Seed the database with sample products:

- Open `server.js` file
- Modify or add sample product objects in the `products` array as needed.

5. Start the application:

```bash
node server.js
```

The server will start running at `http://localhost:3000`.

## API Endpoints

### Get all products

```
GET /products
```

Response:
- Status: 200 OK
- Body: Array of product objects with calculated final price.

### Add a new product

```
POST /products
```

Request Body:
- Product object with the following properties: `productId`, `name`, `productType`, `category`, `basePrice`.

Response:
- Status: 201 Created
- Body: New product object.

### Update a product

```
PUT /products/:productId
```

Request Parameters:
- `productId`: ID of the product to update.

Request Body:
- Updated product object with the properties to modify.

Response:
- Status: 200 OK
- Body: Updated product object.

### Delete a product

```
DELETE /products/:productId
```

Request Parameters:
- `productId`: ID of the product to delete.

Response:
- Status: 200 OK
- Body: Deleted product object.
