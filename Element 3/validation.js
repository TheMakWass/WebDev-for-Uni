function validate_form() {
    var nameField = document.getElementById('name');
    var phoneField = document.getElementById('phone');
    var emailField = document.getElementById('email');
    var phone_number_only = document.querySelector('#phone');

    // prevent letters in phone field
    phone_number_only.onkeydown = function(event) {
        if(isNaN(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
        }
    }

    // trimming phone number
    phoneField.addEventListener('input', function() {
        var maxLength = 11;
        var phoneValue = this.value.trim();
        if (phoneValue.length > maxLength) {
            this.value = phoneValue.slice(0, maxLength);
        }
        if (phoneValue.trim() !== '') {
            this.style.border = '';
        }
    });

    // event listeners to reset border color
    nameField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.border = '';
        }
    });

    phoneField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.border = '';
        }
    });

    // check not empty, valid email, send to notification
    document.getElementById('mainform').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var name_info = document.forms['mainform']['name'].value;
        var phone_info = document.forms['mainform']['phone'].value;
        var email_info = document.forms['mainform']['email'].value;
        var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email_info.trim() === '' || !email_regex.test(email_info.trim())) {
            display_notification(emailField, '*Email');
            emailField.style.border = '2px solid red';
        }

        if (phone_info.trim() === '') {
            display_notification(phoneField, '*Number');
            phoneField.style.border = '2px solid red';
        }

        if (name_info.trim() === '') {
            display_notification(nameField, '*Name');
            nameField.style.border = '2px solid red';
        }

        // submit if correct
        if (name_info.trim() !== '' && phone_info.trim() !== '' && email_info.trim() !== '') {
            event.target.submit();
        }
    });
}

function display_notification(field, message) {
    var notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    var resetButton = field.form.querySelector('input[type="reset"]');

    resetButton.parentNode.insertBefore(notification.cloneNode(true), resetButton.nextSibling);

    setTimeout(function() {
        var notifications = field.form.querySelectorAll('.notification');
        notifications.forEach(function(notif) {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        });
    }, 5000);
}

validate_form();