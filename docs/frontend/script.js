// app.js - Consolidated JavaScript for WSU Appointment System

document.addEventListener('DOMContentLoaded', function() {
    // Common functionality across all pages
    initializeCommonFeatures();
    
    // Page-specific functionality
    if (document.querySelector('#calendar')) {
        initializeCalendar();
    }
    
    if (document.querySelector('#registrationForm')) {
        initializeRegistrationForm();
    }
    
    if (document.querySelector('.login-form')) {
        initializeLoginForm();
    }
    
    if (document.querySelector('.recovery-form')) {
        initializePasswordRecovery();
    }
    
    if (document.querySelector('.appointment-form')) {
        initializeAppointmentForm();
    }
    
    if (document.querySelector('.action-buttons')) {
        initializeAppointmentActions();
    }
});

// Common features used across multiple pages
function initializeCommonFeatures() {
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
    
    // Back button functionality
    const backButtons = document.querySelectorAll('.back-link');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });
    
    // Logout functionality (if logout button exists)
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would call a logout API
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        });
    });
    
    // Search functionality
    const searchForms = document.querySelectorAll('.search-bar');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                // In a real app, this would filter results or call a search API
                alert(`Searching for: ${searchTerm}`);
            }
        });
    });
}

// Calendar page functionality
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'John Doe - Thesis Discussion',
                start: new Date(),
                end: new Date(new Date().getTime() + 30 * 60000), // 30 minutes later
                className: 'accepted',
                extendedProps: {
                    status: 'accepted',
                    studentId: 'WSU12345678'
                }
            },
            {
                title: 'Meeting with CS Dept',
                start: new Date(new Date().getTime() + 86400000 * 5), // 5 days from now
                end: new Date(new Date().getTime() + 86400000 * 5 + 90 * 60000), // 90 minutes later
                color: '#6c757d'
            },
            {
                title: 'Michael Brown - Project Review',
                start: new Date(new Date().getTime() + 86400000 * 7), // 7 days from now
                end: new Date(new Date().getTime() + 86400000 * 7 + 45 * 60000), // 45 minutes later
                className: 'accepted',
                extendedProps: {
                    status: 'accepted',
                    studentId: 'WSU87654321'
                }
            },
            {
                title: 'Emily Wilson - Research Guidance',
                start: new Date(new Date().getTime() + 86400000 * 10), // 10 days from now
                end: new Date(new Date().getTime() + 86400000 * 10 + 45 * 60000), // 45 minutes later
                className: 'pending',
                extendedProps: {
                    status: 'pending',
                    studentId: 'WSU13579246'
                }
            }
        ],
        eventClick: function(info) {
            if (info.event.extendedProps.studentId) {
                // In a real app, this would open a detailed view
                const modal = createAppointmentModal(info.event);
                document.body.appendChild(modal);
                modal.style.display = 'block';
            }
        }
    });
    
    calendar.render();
    
    // Function to create a modal for appointment details
    function createAppointmentModal(event) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${event.title}</h2>
                <p><strong>Date:</strong> ${event.start.toLocaleString()}</p>
                <p><strong>Duration:</strong> ${(event.end - event.start) / 60000} minutes</p>
                <p><strong>Status:</strong> ${event.extendedProps.status}</p>
                <div class="modal-actions">
                    <button class="btn btn-view-details">View Details</button>
                    <button class="btn btn-close">Close</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        
        modal.querySelector('.modal-content').style.backgroundColor = '#fff';
        modal.querySelector('.modal-content').style.margin = '10% auto';
        modal.querySelector('.modal-content').style.padding = '20px';
        modal.querySelector('.modal-content').style.width = '80%';
        modal.querySelector('.modal-content').style.maxWidth = '600px';
        modal.querySelector('.modal-content').style.borderRadius = '8px';
        
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        modal.querySelector('.btn-close').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        modal.querySelector('.btn-view-details').addEventListener('click', function() {
            // In a real app, this would navigate to the appointment details page
            window.location.href = `appointment-detail.html?id=${event.id}`;
        });
        
        return modal;
    }
}

// Registration form functionality
function initializeRegistrationForm() {
    const form = document.querySelector('#registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = form.querySelector('#firstName').value.trim();
        const lastName = form.querySelector('#lastName').value.trim();
        const email = form.querySelector('#email').value.trim();
        const username = form.querySelector('#username').value.trim();
        const password = form.querySelector('#password').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;
        const idNumber = form.querySelector('#idNumber').value.trim();
        
        // Validate form
        if (!validateRegistrationForm(firstName, lastName, email, username, password, confirmPassword, idNumber)) {
            return;
        }
        
        // In a real app, this would send data to the server
        const userData = {
            firstName,
            lastName,
            email,
            username,
            password,
            idNumber
        };
        
        console.log('Registration data:', userData);
        
        // Simulate successful registration
        setTimeout(() => {
            // Redirect based on which registration form was submitted
            if (form.action.includes('dates.html')) {
                window.location.href = 'dates.html';
            } else {
                window.location.href = 'home.html';
            }
        }, 1000);
    });
    
    function validateRegistrationForm(firstName, lastName, email, username, password, confirmPassword, idNumber) {
        // Simple validation - in a real app, this would be more comprehensive
        if (!firstName || !lastName || !email || !username || !password || !confirmPassword || !idNumber) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return false;
        }
        
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }
}

// Login form functionality
function initializeLoginForm() {
    const forms = document.querySelectorAll('.login-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = form.querySelector('#username').value.trim();
            const password = form.querySelector('#password').value;
            
            // Simple validation
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }
            
            // In a real app, this would call a login API
            console.log('Login attempt:', username);
            
            // Simulate successful login
            setTimeout(() => {
                // Store auth token in localStorage (simulated)
                localStorage.setItem('authToken', 'simulated-token');
                
                // Redirect based on which login form was submitted
                if (form.querySelector('a[href="dates.html"]')) {
                    window.location.href = 'dates.html';
                } else if (form.querySelector('a[href="home.html"]')) {
                    window.location.href = 'home.html';
                }
            }, 500);
        });
    });
}

// Password recovery functionality
function initializePasswordRecovery() {
    const form = document.querySelector('.recovery-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = form.querySelector('#username').value.trim();
        
        if (!username) {
            alert('Please enter your username or email');
            return;
        }
        
        // In a real app, this would call a password recovery API
        console.log('Password recovery requested for:', username);
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Hide form
        form.style.display = 'none';
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'reset.html';
        }, 3000);
    });
}

// Appointment request form functionality
function initializeAppointmentForm() {
    const form = document.querySelector('.appointment-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const date = form.querySelector('#date').value;
        const time = form.querySelector('#time').value;
        const purpose = form.querySelector('#purpose').value;
        const details = form.querySelector('#details').value.trim();
        
        // Validate form
        if (!date || !time || !purpose) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would send data to the server
        const appointmentData = {
            date,
            time,
            purpose,
            details: details || 'No additional details provided'
        };
        
        console.log('Appointment request:', appointmentData);
        
        // Simulate successful submission
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 1000);
    });
}

// Appointment action buttons (accept/reschedule/decline)
function initializeAppointmentActions() {
    const acceptBtn = document.querySelector('.btn-accept');
    const rescheduleBtn = document.querySelector('.btn-reschedule');
    const declineBtn = document.querySelector('.btn-decline');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // In a real app, this would call an API to accept the appointment
            alert('Appointment accepted!');
            window.location.href = 'dates.html';
        });
    }
    
    if (rescheduleBtn) {
        rescheduleBtn.addEventListener('click', function() {
            // In a real app, this would open a rescheduling interface
            alert('Reschedule functionality would open here');
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            // In a real app, this would call an API to decline the appointment
            if (confirm('Are you sure you want to decline this appointment?')) {
                alert('Appointment declined');
                window.location.href = 'dates.html';
            }
        });
    }
}

// Utility function to format dates
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Utility function to format times
function formatTime(time) {
    return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Add this CSS for modals and other dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Modal styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
    }
    
    .modal-content {
        background-color: #fff;
        margin: 10% auto;
        padding: 20px;
        width: 80%;
        max-width: 600px;
        border-radius: 8px;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 24px;
        cursor: pointer;
    }
    
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }
    
    /* Loading spinner */
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid #8a90ec;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Form error styles */
    .error-message {
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
    }
    
    .input-error {
        border-color: #dc3545 !important;
    }
`;
document.head.appendChild(dynamicStyles);
