# Simple-Blog-Platform

Develop a fullstack blog application where users can create and view posts.

Requirements:

- Use React.js with TypeScript for the front end.
- Display a list of blog posts with titles and authors.
- Allow users to view a post's full content.
- Provide a form to create new blog posts.
- Use Axios or Fetch API to interact with the backend.
- Implement a REST API using Node.js and NestJS.
- Each post should have a title, author, content, and creation date.
- Store posts in a PostgreSQL (or MongoDB) database.
- Handle validation and errors properly.
  
Bonus Points (Optional):

- Add user authentication (signup/login) using JWT.
- Implement comments for each blog post.
-  Deploy the project on Vercel (frontend) and Railway/Render (backend).

# How the Logic Flows (of Registration, Login...)

# 1.Client Sends a Request:

   - The client (frontend) sends an HTTP request to a specific endpoint (e.g., POST /auth/register).
   - OR Client sends a request to an endpoint (e.g., GET /posts).

# 2.Route Handles the Request:(defines the API endpoints and maps them to the appropriate controller functions.)
   - The route (routes/auth.routes.js) maps the request to the appropriate controller function (registerUser).
   - OR Route maps the request to the appropriate controller function (e.g., getAllPostsHandler).

# 3.Controller Processes the Request:

   - The controller (controllers/auth.controller.js) extracts data from the request (e.g., email and password from the request body).

   - It calls the corresponding service (auth.service.js) to perform the business logic (e.g., user registration OR getAllPosts).

# 4.Service Executes Business Logic:(service = dealing with database)

  -  The service (services/auth.service.js) performs the necessary operations (e.g., hashing the password, saving the user to the database).

   - It returns the result (e.g., the newly created user) to the controller.

# 5.Controller Sends the Response:(all about giving feedback)

  -  The controller receives the result from the service and sends a response back to the client (e.g., 201 Created with the user data).
  - It calls the appropriate service functions and sends the response back to the client.
# Visualization
Client (Frontend)
       ↓
Routes (auth.routes.js)
       ↓
Controllers (auth.controller.js)
       ↓
Services (auth.service.js)
       ↓
Database (Prisma)




src/
├── controllers/
│   ├── auth.controller.js
│   ├── post.controller.js
├── middleware/
│   ├── auth.middleware.js
├── models/
│   ├── user.model.js  # Prisma will handle this
├── routes/
│   ├── auth.routes.js
│   ├── post.routes.js
├── services/
│   ├── auth.service.js
│   ├── post.service.js
├── utils/
│   ├── jwt.utils.js
├── prisma/
│   ├── schema.prisma
├── app.js
├── server.js