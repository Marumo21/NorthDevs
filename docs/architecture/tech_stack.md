# Technology Stack

### Backend: Python (Django and Django REST Framework)
### Frontend: HTML, CSS & JavaScript 
### Database: PostgreSQL  
### Caching Layer : Redis


## Justification

### Backend
Django is a powerful, high-level Python web framework that allows for rapid development and clean,
pragmatic design. Combined with Django REST Framework, it gives us everything we need to build a secure, 
scalable backend API with less code and more built-in features.


**We chose it because:**
- Robust, secure, and scalable  
- Comes with a powerful built-in admin dashboard  
- REST API support with built-in session and token authentication  
- CSRF protection and form validation by default

  
### Frontend
We're keeping things fast, modular, and framework-free. Static HTML pages enhanced with JavaScript modules
form the UI layer.

**We chose it because:**
- Loads fast, especially helpful for students using campus Wi-Fi.
- Easy to maintain, debug, and improve.
- Doesn’t require React/Vue, keeping the learning curve low.
- Easy to maintain and integrate with Django templates 
- JavaScript modules (like `calendar.js`, `maps.js`, `auth.js`) allow dynamic functionality without complex SPA logic.

### Database – PostgreSQL
PostgreSQL is a powerful, open-source relational database known for its reliability, scalability, and
support for complex queries.

**We chose it because:**
- Perfect for handling appointment data, user profiles, and relational logic.
- Offers advanced features like indexing, foreign key constraints, and stored procedures.
- Easily integrates with Django’s ORM.
  
### Caching Layer
Redis is used to improve performance and responsiveness by caching frequent queries(e.g availability lookups) 
and storing session data.

**We chose it because:**
- Extremely fast in-memory data storage.
- Reduces load on the main database.
- Ideal for tracking user sessions, lecturer statuses, and real-time availability.

**User Cases:**
- Caching booking slots  
- Faster access to frequently queried data like availability and lecturer status  


### API Layer (Also Django)

Handles communication between frontend and backend using Fetch API or AJAX calls.

**Key Features:**

- RESTful endpoints for user, booking, and status data  
- CSRF-secure form handling  
- Session-based authentication  

## Service Layer (Internal Modules)
Our logic is divided into distinct service modules for maintainability:

- **Scheduling Service** – Appointment and calendar logic  
- **Navigation Service** – Location lookups and directions  
- **User Service** – Auth, roles, and profiles  

### Hosting Environment

- **Staging:** Heroku (for testing and CI deployments)  
- **Production:** AWS (EC2, S3, RDS for PostgreSQL)  

**We chose it because**
- Scalable infrastructure  
- Supports Docker, Django, and PostgreSQL with ease  
- Industry standard for cloud reliability and security  

