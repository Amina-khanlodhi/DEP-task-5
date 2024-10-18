document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for real-time validation
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('date').addEventListener('change', validateDate);
    document.getElementById('guests').addEventListener('input', validateGuests);

    // Handle form submission
    document.getElementById('reservationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission

        // Validate form before submitting
        if (validateForm()) {
            // Show success message if form is valid
            showSuccessMessage();
        }
    });
});

function validateName() {
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    if (name === '') {
        showError('name', 'Please enter your full name.');
        return false;
    } else {
        showValid('name');
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        showError('email', 'Please enter a valid email address.');
        return false;
    } else {
        showValid('email');
        return true;
    }
}

function validatePhone() {
    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        showError('phone', 'Phone number must be 10 digits.');
        return false;
    } else {
        showValid('phone');
        return true;
    }
}

function validateDate() {
    const date = document.getElementById('date').value;
    const today = new Date().toISOString().split('T')[0];
    if (date === '' || date < today) {
        showError('date', 'Please select a valid future date.');
        return false;
    } else {
        showValid('date');
        return true;
    }
}

function validateGuests() {
    const guests = document.getElementById('guests').value;
    if (guests < 1 || guests > 20) {
        showError('guests', 'Number of guests must be between 1 and 20.');
        return false;
    } else {
        showValid('guests');
        return true;
    }
}

function validateForm() {
    const nameValid = validateName();
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const dateValid = validateDate();
    const guestsValid = validateGuests();

    return nameValid && emailValid && phoneValid && dateValid && guestsValid;
}

function showError(field, message) {
    const errorElement = document.getElementById(field + 'Error');
    const inputElement = document.getElementById(field);
    inputElement.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.classList.add('shake');
    setTimeout(() => inputElement.classList.remove('shake'), 300);
}

function showValid(field) {
    const errorElement = document.getElementById(field + 'Error');
    const inputElement = document.getElementById(field);
    inputElement.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '✓ Looks good!';
    errorElement.className = 'valid show';
}

// Function to show success message on successful submission
function showSuccessMessage() {
    // Display a simple alert or you can replace this with a modal popup
    alert('Thank you! Your reservation has been submitted successfully.');

    // Optionally, reset the form after submission
    document.getElementById('reservationForm').reset();
    // Reset the validation messages
    const errorElements = document.querySelectorAll('.error, .valid');
    errorElements.forEach(element => element.classList.remove('show'));
}


