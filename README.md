# URL Shortener Service

A full-stack URL shortening service with analytics built with Node.js, Express, MongoDB and React.

# 1) Features:
Shorten URLs with custom aliases, 
Redirect tracking with visit analytics,
REST API for programmatic access,
Responsive frontend with modern UI and
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
# Endpoint 1: 
/api/shorten (Method:POST) (Description:Create short URL)
# Endpoint 2: 
/api/:code	(Method:GET) 	(Description:Redirect to original URL)
# Endpoint 3: 
/api/:code/stats (Method:GET)	(Description:Get URL statistics)
# Endpoint 4: 
/api/:code 	(Method:DELETE)	(Description:Remove short URL)

Also Test all the endpoints on POSTMAN to make sure they are working correct!
# GitHub Setup Instructions
Finalize Your Branch,
Add Commits and
Push it

