# URL Shortener Service

A full-stack URL shortening service with analytics built with Node.js, Express, MongoDB and React.

# 1) Features:
Shorten URLs with custom aliases
Redirect tracking with visit analytics
REST API for programmatic access
Responsive frontend with modern UI
MongoDB storage for persistent data

# 2) Tech Stack
Backend:
Node.js,
Express and
MongoDB/Mongoose

Frontend:
React and
Axios

# 3) Setup Instructions
Prerequisites
Node.js (v16+),
MongoDB (local or Atlas) and
Git

# Installation
git clone your_repo
# Install backend dependencies
cd backend, 
npm install
# Install frontend dependencies
cd ../frontend, 
npm install

Configuration
Create .env files

# 4) Running the Application
npm start

# 5) API Documentation
Endpoint	     Method	Description
/api/shorten	 POST	Create short URL
/api/:code	     GET	Redirect to original URL
/api/:code/stats GET	Get URL statistics
/api/:code	     DELETE	Remove short URL

# GitHub Setup Instructions
Finalize Your Branch,
Add Commits and
Push it

