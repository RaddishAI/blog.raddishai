function validateForm() {
    let isValid = true;


    const name = document.getElementById('name').value;
    const nameError = document.getElementById('nameError');
    if (name.length < 6) {
        nameError.textContent = "Name must be more than 5 characters long.";
        isValid = false;
    } else {
        nameError.textContent = ""; 
    }

    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    
    const subject = document.getElementById('subject').value;
    const subjectError = document.getElementById('subjectError');
    if (subject.length < 16) {
        subjectError.textContent = "Subject must be more than 15 characters long.";
        isValid = false;
    } else {
        subjectError.textContent = ""; 
    }

    const message = document.getElementById('message').value;
    const messageError = document.getElementById('messageError');
    if (message.length < 26) {
        messageError.textContent = "Message content must be more than 25 characters long.";
        isValid = false;
    } else {
        messageError.textContent = ""; 
    }

    return isValid; 
}