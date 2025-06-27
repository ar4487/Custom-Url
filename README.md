# 🔗 Custom URL Shortener

A simple and clean URL shortening service built using **Node.js**, **Express**, and **MongoDB**. Generate short links and redirect to long URLs — like Bitly or TinyURL.

## 🚀 Features

- Shorten long URLs with a unique code
- Redirect users via the short code
- MongoDB integration via Mongoose
- Environment-based configuration
- Clean and modular project structure

# 🔗 Custom URL Shortener

A clean and simple URL shortening service built using **Node.js**, **Express**, and **MongoDB**. Like Bitly or TinyURL, this app allows users to shorten long URLs into compact, easily shareable links.

---

## 🚀 Features

- Shortens any valid long URL
- Generates a unique shortcode using `shortid`
- Redirects to the original URL via the short link
- MongoDB integration using Mongoose
- Environment-based configuration using `dotenv`
- Clean, modular codebase

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Shortid
- dotenv

---

## 📦 Setup Instructions

> 👇 These steps are only for someone who wants to run this project locally

### 1. Clone the Repository

```bash
git clone https://github.com/ar4487/Custom-Url.git
cd Custom-Url

```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB
servicePORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Sign up for a new account
2. Log in with your credentials
3. Enter a URL to shorten
4. Copy the shortened URL
5. Track visits and analytics
6. Delete URLs when needed

## API Endpoints

- `POST /url` - Create a new short URL
- `GET /url/:shortId` - Redirect to original URL
- `GET /url/analytics/:shortId` - Get URL analytics
- `DELETE /url/:shortId` - Delete a URL

## Security Features

- JWT-based authentication
- HTTP-only cookies
- URL expiration
- User-specific URL management

## Sample Request & Response
- Request Body
 {
  "longUrl": "https://www.google.com"
}
- Response
{
  "shortUrl": "http://localhost:5000/abc123",
  "longUrl": "https://www.google.com",
  "urlCode": "abc123"
}

## Folder Structure
.
├── config          # MongoDB connection logic
├── controllers     # URL shortener logic
├── models          # MongoDB schema
├── routes          # API routes
├── server.js       # App entry point

## 🙌 Author

**Arpit Bhadoria**  
🔗 [GitHub Profile](https://github.com/ar4487)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.


This project is licensed under the MIT License - see the LICENSE file for details. 
