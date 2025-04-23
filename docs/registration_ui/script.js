
// Student Interface Logic
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the student page
    if (document.getElementById('student-login-btn')) {
        initStudentInterface();
    }
    
    // Check if we're on the lecturer page
    if (document.getElementById('lecturer-login-btn')) {
        initLecturerInterface();
    }
});

function initStudentInterface() {
    // Login functionality
    const loginBtn = document.getElementById('student-login-btn');
    const usernameInput = document.getElementById('student-username');
    const passwordInput = document.getElementById('student-password');
    const loginError = document.getElementById('login-error');
    
    loginBtn.addEventListener('click', function() {
        if (usernameInput.value && passwordInput.value) {
            // Simulate successful login
            document.getElementById('login-screen').classList.remove('active');
            document.getElementById('home-screen').classList.add('active');
        } else {
            loginError.textContent = 'Please enter both username and password';
        }
    });
    
    // Home screen navigation
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.type === 'lecturer') {
                document.getElementById('home-screen').classList.remove('active');
                document.getElementById('lecturers-screen').classList.add('active');
            }
        });
    });
    
    // Search functionality on home screen
    const homeSearchBtn = document.querySelector('#home-screen .search-btn');
    homeSearchBtn.addEventListener('click', function() {
        document.getElementById('home-screen').classList.remove('active');
        document.getElementById('appointment-screen').classList.add('active');
    });
    
    // Lecturer list actions
    const appointmentBtns = document.querySelectorAll('.appointment-btn');
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;
            const email = row.cells[1].textContent;
            const tel = row.cells[2].textContent;
            const office = row.cells[3].textContent;
            
            // Set lecturer info in appointment screen
            document.getElementById('appointment-lecturer-name').textContent = name;
            document.getElementById('appointment-lecturer-email').textContent = email;
            document.getElementById('appointment-lecturer-tel').textContent = tel;
            document.getElementById('appointment-lecturer-office').textContent = office;
            
            document.getElementById('lecturers-screen').classList.remove('active');
            document.getElementById('appointment-screen').classList.add('active');
        });
    });
    
    const messageBtns = document.querySelectorAll('.message-btn');
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('lecturers-screen').classList.remove('active');
            document.getElementById('messages-screen').classList.add('active');
        });
    });
    
    // Request appointment button
    const requestAppointmentBtn = document.getElementById('request-appointment-btn');
    requestAppointmentBtn.addEventListener('click', function() {
        document.getElementById('appointment-screen').classList.remove('active');
        document.getElementById('appointment-slot-screen').classList.add('active');
    });
    
    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    const requestNowBtn = document.getElementById('request-now-btn');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Enable request now button
            requestNowBtn.disabled = false;
        });
    });
    
    // Request now button
    requestNowBtn.addEventListener('click', function() {
        document.getElementById('appointment-slot-screen').classList.remove('active');
        
        // Set lecturer info in confirmation screen
        document.getElementById('confirm-lecturer-name').textContent = 
            document.getElementById('appointment-lecturer-name').textContent;
        document.getElementById('confirm-lecturer-email').textContent = 
            document.getElementById('appointment-lecturer-email').textContent;
        document.getElementById('confirm-lecturer-tel').textContent = 
            document.getElementById('appointment-lecturer-tel').textContent;
        document.getElementById('confirm-lecturer-office').textContent = 
            document.getElementById('appointment-lecturer-office').textContent;
            
        document.getElementById('confirmation-screen').classList.add('active');
    });
    
    // Confirmation screen buttons
    document.getElementById('view-office-map').addEventListener('click', function() {
        alert('This would show a map to the lecturer\'s office in a real implementation.');
    });
    
    document.getElementById('return-home').addEventListener('click', function() {
        document.getElementById('confirmation-screen').classList.remove('active');
        document.getElementById('home-screen').classList.add('active');
    });
}

function initLecturerInterface() {
    // Login functionality
    const loginBtn = document.getElementById('lecturer-login-btn');
    const usernameInput = document.getElementById('lecturer-username');
    const passwordInput = document.getElementById('lecturer-password');
    const loginError = document.getElementById('lecturer-login-error');
    
    loginBtn.addEventListener('click', function() {
        if (usernameInput.value && passwordInput.value) {
            // Simulate successful login
            document.getElementById('lecturer-login-screen').classList.remove('active');
            document.getElementById('appointment-notice-screen').classList.add('active');
        } else {
            loginError.textContent = 'Please enter both username and password';
        }
    });
    
    // Appointment notice actions
    const submitActionBtn = document.getElementById('submit-appointment-action');
    submitActionBtn.addEventListener('click', function() {
        const selectedAction = document.querySelector('input[name="appointment-action"]:checked');
        
        if (selectedAction) {
            document.getElementById('appointment-notice-screen').classList.remove('active');
            
            if (selectedAction.value === 'confirm') {
                document.getElementById('lecturer-confirmation-screen').classList.add('active');
            } else {
                // For reschedule or decline, we'd typically show different screens
                // For this prototype, we'll just go to confirmation
                document.getElementById('lecturer-confirmation-screen').classList.add('active');
            }
        } else {
            alert('Please select an action');
        }
    });
    
    // View appointments button
    document.getElementById('lecturer-view-appointments').addEventListener('click', function() {
        document.getElementById('lecturer-confirmation-screen').classList.remove('active');
        document.getElementById('appointment-calendar-screen').classList.add('active');
    });
    
    // View appointments from calendar
    document.getElementById('view-appointments-btn').addEventListener('click', function() {
        document.getElementById('appointment-calendar-screen').classList.remove('active');
        document.getElementById('my-appointments-screen').classList.add('active');
    });
    
    // Calendar navigation
    const prevMonthBtn = document.querySelector('#appointment-calendar-screen .prev-month');
    const nextMonthBtn = document.querySelector('#appointment-calendar-screen .next-month');
    
    prevMonthBtn.addEventListener('click', function() {
        alert('Previous month would be loaded in a real implementation');
    });
    
    nextMonthBtn.addEventListener('click', function() {
        alert('Next month would be loaded in a real implementation');
    });
    
    // Appointment date selection
    const calendarDays = document.querySelectorAll('#appointment-calendar-screen .calendar-days div:not(.empty)');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            if (this.classList.contains('has-appointment')) {
                // Show appointments for that day
                document.getElementById('appointment-calendar-screen').classList.remove('active');
                document.getElementById('my-appointments-screen').classList.add('active');
            }
        });
    });
}
