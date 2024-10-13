# Hapi.js Unkey API Protection Example

This repository demonstrates how to create a minimal API with Hapi.js, including public and protected routes. The protected route is secured using Unkey.

## Features

- A **public** route that anyone can access.
- A **protected** route that requires a valid Unkey token to access.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) 
- A Unkey account (to generate a root key and access tokens)

## Quickstart

### 1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Yash-1511/hapi-unkey-template.git
cd hapi-unkey-template
npm install
```

### 2. Set up the environment:

- In your Unkey account, navigate to **Settings** and generate a **Root Key**.
- Create a `.env` file and add your Unkey root key:

```bash
UNKEY_ROOT_KEY=your-unkey-root-key-here
```

### 3. Run the server:

```bash
node server.js
```

The server will run on `http://localhost:3000`.

### 4. Available routes:

- **`GET /public`** - This is a public route accessible by anyone.
- **`GET /protected`** - This is a protected route, requiring a valid Unkey token.

### 5. Generate an API key in Unkey:

- Go to your Unkey dashboard and create an API key.
- You can use this API key as the bearer token when accessing the protected route.

### 6. Making requests:

#### Public Route:

You can access the public route by making a simple `GET` request:

```bash
curl http://localhost:3000/public
```

You should get a response:

```json
{
  "message": "This is a public route."
}
```

#### Protected Route:

To access the protected route, you need to include the Unkey token as a bearer token in the request header. Replace `your-unkey-api-key` with the actual key you generated in Unkey.

```bash
curl -H "Authorization: Bearer your-unkey-api-key" http://localhost:3000/protected
```

If the token is valid, you will get a response like this:

```json
{
  "message": "This is a protected route, secured by Unkey."
}
```

If the token is missing or invalid, you will get an error response:

```json
{
  "error": "Invalid token"
}
```

### 7. Troubleshooting:

- **Missing Authorization Header**: Ensure you pass the `Authorization: Bearer <token>` header.
- **Invalid Token**: Make sure the token you are using is valid and has not expired.

## License

This project is licensed under the MIT License.



