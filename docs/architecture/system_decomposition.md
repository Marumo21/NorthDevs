# System Decomposition

## Component Responsibilities

### 1. User Authentication
- Handle student and lecturer registration, login, and profile management.
- Provide password recovery functionality (e.g. "Forgot Password").
- Manage role-based access control (student, lecturer, HOD, secretary).

### 2. Lecturer Management
- Maintain lecturer profiles including name, email, telephone number, and office location.
- Enable searching and filtering of lecturers (as shown in the "List of Lecturers" section).
- Display lecturer availability status (available, busy, in meeting).

### 3. Appointment Scheduling
- Provide calendar interface for viewing available time slots (month/week/day views).
- Handle appointment requests, confirmations, rescheduling, and cancellations.
- Manage conflict detection for double bookings.
- Send confirmation notifications (email/in-app).

### 4. Messaging System
- Enable direct communication between students and lecturers.
- Provide message history and search functionality.
- Support notifications for new messages.

### 5. Navigation & Status Tracking
- Display real-time availability status of lecturers.
- Provide directions/maps to lecturer offices.
- Integrate with campus navigation systems if available.

### 6. Admin Dashboard
- Manage user accounts and permissions.
- Handle system configurations and settings.
- Monitor system usage and generate reports.
- Resolve scheduling conflicts or disputes.

## Program call flow

### Student Appointment Request Flow

```mermaid
sequenceDiagram
    participant S as Student Browser
    participant API as Backend API
    participant DB as Database
    participant NS as Notification Service
    participant LB as Lecturer Browser
    
    note over S: Student logs in and searches for lecturer
    S->>API: POST /api/auth/login (student credentials)
    API->>DB: Validate credentials
    DB-->>API: Return user data (student)
    API-->>S: Return JWT and student profile
    
    S->>API: GET /api/users/lecturers?name=searchTerm
    API->>DB: Query lecturers by name
    DB-->>API: Return matching lecturers
    API-->>S: Return lecturer list
    
    note over S: Student selects lecturer and views available slots
    S->>API: GET /api/users/lecturers/:id
    API->>DB: Get lecturer details
    DB-->>API: Return lecturer profile
    API-->>S: Return lecturer details
    
    S->>API: GET /api/availability/:lecturerId?startDate=X&endDate=Y
    API->>DB: Query lecturer availability
    DB-->>API: Return available slots
    API-->>S: Return availability data
    
    note over S: Student selects time slot and submits request
    S->>API: POST /api/appointments
    API->>DB: Create appointment request
    DB-->>API: Return created appointment
    API->>NS: Create notification for lecturer
    NS->>DB: Store notification
    API-->>S: Return appointment confirmation
    
    note over S: Student views confirmation with office location
    S->>API: GET /api/navigation/office/:lecturerId
    API->>DB: Get office location data
    DB-->>API: Return location details
    API-->>S: Return navigation data
    
    note over LB: Lecturer receives notification and responds
    NS-->>LB: Real-time notification (WebSocket)
    LB->>API: GET /api/appointments/:id
    API->>DB: Get appointment details
    DB-->>API: Return appointment data
    API-->>LB: Return appointment details
    
    LB->>API: PUT /api/appointments/:id (accept/decline/reschedule)
    API->>DB: Update appointment status
    DB-->>API: Return updated appointment
    API->>NS: Create notification for student
    NS->>DB: Store notification
    API-->>LB: Return success response
    
    NS-->>S: Real-time notification (WebSocket)
    S->>API: GET /api/appointments/:id
    API->>DB: Get updated appointment
    DB-->>API: Return appointment data
    API-->>S: Return updated appointment details
```

### Lecturer Availability Management Flow

```mermaid
sequenceDiagram
    participant L as Lecturer Browser
    participant API as Backend API
    participant DB as Database
    
    note over L: Lecturer logs in and accesses availability settings
    L->>API: POST /api/auth/login (lecturer credentials)
    API->>DB: Validate credentials
    DB-->>API: Return user data (lecturer)
    API-->>L: Return JWT and lecturer profile
    
    L->>API: GET /api/availability/:lecturerId
    API->>DB: Query lecturer's current availability
    DB-->>API: Return availability slots
    API-->>L: Return availability data
    
    note over L: Lecturer updates availability settings
    L->>API: POST /api/availability (new slots)
    API->>DB: Create new availability slots
    DB-->>API: Return created slots
    API-->>L: Return success response
    
    L->>API: PUT /api/availability/:id (update existing slot)
    API->>DB: Update availability slot
    DB-->>API: Return updated slot
    API-->>L: Return updated data
    
    L->>API: DELETE /api/availability/:id (remove slot)
    API->>DB: Delete availability slot
    DB-->>API: Confirm deletion
    API-->>L: Return success response
    
    note over L: Lecturer views current appointment requests
    L->>API: GET /api/appointments?status=pending
    API->>DB: Query pending appointments
    DB-->>API: Return appointment data
    API-->>L: Return appointment list
```

### Messaging Flow

```mermaid
sequenceDiagram
    participant S as Student Browser
    participant API as Backend API
    participant DB as Database
    participant NS as Notification Service
    participant L as Lecturer Browser
    
    note over S: Student initiates conversation with lecturer
    S->>API: GET /api/users/lecturers/:id
    API->>DB: Get lecturer details
    DB-->>API: Return lecturer data
    API-->>S: Return lecturer profile
    
    S->>API: POST /api/messages (receiverId: lecturerId, content: message)
    API->>DB: Store new message
    DB-->>API: Return created message
    API->>NS: Create notification for lecturer
    NS->>DB: Store notification
    API-->>S: Return message confirmation
    
    note over L: Lecturer receives message notification
    NS-->>L: Real-time notification (WebSocket)
    L->>API: GET /api/notifications
    API->>DB: Query notifications
    DB-->>API: Return notification data
    API-->>L: Return notification list
    
    L->>API: GET /api/messages/:studentId
    API->>DB: Get conversation history
    DB-->>API: Return message data
    API-->>L: Return conversation history
    
    L->>API: POST /api/messages (receiverId: studentId, content: reply)
    API->>DB: Store reply message
    DB-->>API: Return created message
    API->>NS: Create notification for student
    NS->>DB: Store notification
    API-->>L: Return message confirmation
    
    NS-->>S: Real-time notification (WebSocket)
    S->>API: GET /api/messages/:lecturerId
    API->>DB: Get updated conversation
    DB-->>API: Return message data
    API-->>S: Return conversation with new message
```

## Scalability and Performance Considerations

1. **Database Optimization**:
   - Implement indexing on frequently queried fields
   - Use connection pooling for database connections
   - Implement database query caching for lecturer listings and availability data

2. **Caching Strategy**:
   - Redis cache for user sessions
   - Cache lecturer availability data
   - Cache campus map and location data

3. **Horizontal Scaling**:
   - Stateless API design allowing for multiple instances
   - Load balancing across API instances
   - Database read replicas for scaling read operations

4. **Performance Optimizations**:
   - Pagination for lists (lecturers, appointments, messages)
   - Lazy loading of images and non-critical data
   - Optimized API responses with only required fields
   - Client-side caching of static assets

5. **Real-time Architecture**:
   - WebSocket connection pooling
   - Message queuing for notifications (RabbitMQ/AWS SQS)
   - Event-driven architecture for appointment status changes

## Security Considerations

1. **Authentication Security**:
   - JWT with appropriate expiration
   - Secure password hashing (bcrypt)
   - HTTPS for all communications
   - Protection against brute force attacks

2. **API Security**:
   - Input validation and sanitization
   - CSRF protection
   - Rate limiting
   - Proper error handling without exposing sensitive information

3. **Data Protection**:
   - Encrypted storage of sensitive data
   - Role-based access control
   - Principle of least privilege
   - Audit logging for sensitive operations

4. **Frontend Security**:
   - XSS protection
   - Content Security Policy
   - Protection against clickjacking
