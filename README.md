# Custom URL Shortener

A secure and user-friendly URL shortener application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Create custom shortened URLs
- URL expiration (5 minutes by default)
- Track URL visits and analytics
- Delete URLs
- Responsive design
- Latest URLs shown first

## Tech Stack

- Node.js
- Express.js
- MongoDB
- EJS (Template Engine)
- JWT for authentication
- Nanoid for URL generation

## Prerequisites

- Node.js (v14 or higher)
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