# Express/PostgreSQL REST API for CRUD Operations

## Overview

This is a simple REST API built with **Express.js** framework and **PostgreSQL** database, implementing basic **CRUD** operations for a `users` table. Input validation is handled via `express-validator`.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- express-validator

---

## Project Structure

```kotlin
express-postgreSQL-rest-api/
│
├── userControllers.js
│
├── userRoutes.js
│
├── database.sql
│
├── db.js
│
├── usersValidatorMiddleware.js
│
├── index.js
│
└── package.json
```

---

## Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed in your system:

- Node.js (v14+ recommended)
- npm or yarn
- PostgreSQL along with pgAdmin 4

### 1. Clone the repository

```bash
git clone https://github.com/username/express-postgreSQL-rest-api.git
cd express-postgreSQL-rest-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure PostgreSQL Database Connection

```js
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_pg_user",
  host: "localhost",
  database: "your_db_name",
  password: "your_pg_password"(optional),
  port: 5432,
});
```

### 4. Set up PostgreSQL Database and Table

**Open the `psql` command-line tool:**

1. In a Windows Command Prompt, run the command: `psql -U postgres`.

2. Enter your password when prompted.

Then in the SQL shell (psql), execute the following commands:

- Create a database:

  ```sql
  CREATE DATABASE your_db_name;
  ```

- Move into your created database:

  ```sql
  \c into your_db_name
  ```

- Create the users table:

  ```sql
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    age INTEGER
  );
  ```

You can alternatively run the following commands in a terminal using:

```bash
createdb your_db_name
psql -U your_pg_user -d your_db_name -f database.sql
```

### 5. Start the Express server

```bash
npm start or
npm run dev
```

Server will run at: `http://localhost:3000`

Ensure the server stays running while you make your API requests.

## API Endpoints

**Base URL:** `http://localhost:3000/users`

### Create a User

**POST** `/users`

**Request Body**

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30
}
```

**Success Response**

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30
}
```

**Existing Email Error Response**

```json
{
  "error": "Email already exists"
}
```

**Validation Errors**

```json
{
  "errors": [{ "msg": "Valid email is required", "path": "email" }]
}
```

### Get All Users

**GET** `/users`

**Success Response**

```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 30
  }
]
```

### Get User by ID

**GET** `/users/:id`

**Success Response**

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30
}
```

**404 Not Found**

```json
{
  "error": "User not found"
}
```

### Update User

**PUT** `/users/:id`

**Request Body**

```json
{
  "name": "Alice Updated",
  "email": "alice_updated@example.com",
  "age": 31
}
```

**Success Response**

```json
{
  "id": 1,
  "name": "Alice Updated",
  "email": "alice_updated@example.com",
  "age": 31
}
```

**404 Not Found**

```json
{
  "error": "User not found"
}
```

### Delete User

**DELETE** `/users/:id`

**Success Response**

```json
{
  "message": "User deleted successfully"
}
```

**404 Not Found**

```json
{
  "error": "User not found"
}
```

### Input Validation Summary

| Field | Rule                                 |
| ----- | ------------------------------------ |
| name  | Required, non-empty                  |
| email | Required (POST request), valid email |
| age   | Must be a positive integer           |
| id    | Must be an integer (for `:id`)       |

## Testing with Postman

Here are **Postman example requests** for testing this **Express + PostgreSQL CRUD API**. These requests assume your server is running at:

```arduino
http://localhost:3000
```

### 1. Postman Setup Instructions

- Open Postman.

- Create a new collection named: User CRUD API.

- Set the base URL to `http://localhost:3000/users`.

### 2. API Test Cases with Example Requests

- **POST `/users` - Create User**

  **Headers:**

  - **Content-Type:** `application/json`

  **Request:**

  - **Method: `POST`**

  - **URL:** `http://localhost:3000/users`

  - **Body (raw JSON):**

    ```json
    {
      "name": "Bob",
      "email": "bob@example.com",
      "age": 32
    }
    ```

  - **Success Response (201)**

    ```json
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com",
      "age": 32
    }
    ```

  - **Validation Error**

    ```json
    {
      "errors": [
        { "msg": "Name is required", "path": "name", ... }
      ]
    }
    ```

- **GET `/users` - Get All Users**

  **Request:**

  - **Method: `GET`**

  - **URL:** `http://localhost:3000/users`

  - **Success Response**
    ```json
    [
      {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "age": 25
      },
      {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com",
        "age": 32
      }
    ]
    ```

- **GET `/users/:id` - Get User by ID**

  **Request:**

  - **Method: `GET`**

  - **URL:** `http://localhost:3000/users/1`

  - **Success Response**

    ```json
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "age": 25
    }
    ```

  - **User Not Found**

    ```json
    {
      "error": "User not found"
    }
    ```

- **PUT `/users/:id` - Update User**

  **Headers:**

  - **Content-Type:** `application/json`

  **Request:**

  - **Method: `PUT`**

  - **URL:** `http://localhost:3000/users/1`

  - **Body (raw JSON):**

    ```json
    {
      "name": "Alice Updated",
      "email": "alice@updated.com",
      "age": 26
    }
    ```

  - **Success Response**

    ```json
    {
      "id": 1,
      "name": "Alice Updated",
      "email": "alice@updated.com",
      "age": 26
    }
    ```

  - **Validation Error (Missing Email)**

    ```json
    {
      "errors": [{ "msg": "Email must be valid", "path": "email" }]
    }
    ```

- **DELETE `/users/:id`- Delete User**

  **Request:**

  - **Method: `DELETE`**

  - **URL:** `http://localhost:3000/users/1`

  - **Success Response**

    ```json
    {
      "message": "User deleted successfully"
    }
    ```

  - **User Not Found**
    ```json
    {
      "error": "User not found"
    }
    ```

### 3. Postman Collection Export (Optional)

You can manually export your collection by:

- Clicking the collection name → "Export".

- Select Collection v2.1.

- Share the .json file or import it later via Import → Upload File.

## Author

**Made by `Aderonke Fadare`**
