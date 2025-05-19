# System Decomposition

## Modules

1. **User Authentication**
2. **Lecturer Management**
3. **Appointment Scheduling**
4. **Messaging System**
5. **Navigation & Status Tracking**
6. **Admin Dashboard**

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

## Key Flows

1. **Student Flow**:
   - Login → Search Lecturer → View Availability → Request Appointment → Receive Confirmation → Message Lecturer → Navigate to Office

2. **Lecturer Flow**:
   - Login → View Appointment Requests → Confirm/Reschedule/Decline → Manage Calendar → Communicate with Students

3. **Admin Flow**:
   - Monitor System → Manage Users → Generate Reports → Resolve Issues

## Integration Points

- University authentication system (for single sign-on)
- Email/SMS notification services
- Calendar systems (Google Calendar, Outlook etc.)
- University directory services
