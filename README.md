# 🔗 Custom URL Shortener

A simple and clean URL shortening service built using **Node.js**, **Express**, and **MongoDB**. Generate short links and redirect to long URLs — like Bitly or TinyURL.

## 🚀 Features

- Shorten long URLs with a unique code
- Redirect users via the short code
- MongoDB integration via Mongoose
- Environment-based configuration
- Clean and modular project structure

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Shortid
- dotenv

## 📦 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/ar4487/Custom-Url.git
   cd Custom-Url

- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/custom-url-shortener.git
cd custom-url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
