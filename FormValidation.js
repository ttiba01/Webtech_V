const form = document.getElementById("Form");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    if (isLocked) {
        document.getElementById("passwordError").innerHTML =
            "Too many attempts. Password field is locked.";
        return;
    }

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let department = document.getElementById("department");
    let about = document.getElementById("about");

    let gender = document.querySelector('input[name="gender"]:checked');
    let interests = document.querySelectorAll('input[name="interest"]:checked');

    let valid = true;

    if (firstName.value.trim() == "") {

        showError(firstName, "firstNameError", "First name is required.");
        valid = false;

    }
    else if (!/^[A-Za-z]+$/.test(firstName.value.trim())) {

        showError(firstName, "firstNameError", "Only alphabets are allowed.");
        valid = false;

    }
    else {

        showSuccess(firstName);

    }

    if (lastName.value.trim() == "") {

        showError(lastName, "lastNameError", "Last name is required.");
        valid = false;

    }
    else if (!/^[A-Za-z]+$/.test(lastName.value.trim())) {

        showError(lastName, "lastNameError", "Only alphabets are allowed.");
        valid = false;

    }
    else {

        showSuccess(lastName);

    }

    if (email.value.trim() == "") {

        showError(email, "emailError", "Email is required.");
        valid = false;

    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {

        showError(email, "emailError", "Invalid email address.");
        valid = false;

    }
    else {

        showSuccess(email);

    }


    if (password.value.trim() == "") {

        wrongAttempts++;

        showError(
            password,
            "passwordError",
            "Password is required. Attempt " + wrongAttempts + " of 3."
        );

        valid = false;

        if (wrongAttempts >= 3) {

            isLocked = true;

            document.getElementById("passwordError").innerHTML =
                "Too many attempts. Password field is locked.";

            password.disabled = true;

        }

    }
    else {

        showSuccess(password);

    }


    if (gender == null) {

        document.getElementById("genderError").innerHTML =
            "Please select your gender.";

        valid = false;

    }

    if (interests.length == 0) {

        document.getElementById("interestError").innerHTML =
            "Select at least one interest.";

        valid = false;

    }


    if (department.value == "") {

        showError(
            department,
            "departmentError",
            "Please select a department."
        );

        valid = false;

    }
    else {

        showSuccess(department);

    }

    if (about.value.trim() == "") {

        showError(about, "aboutError", "This field is required.");
        valid = false;

    }
    else if (about.value.trim().length < 20) {

        showError(
            about,
            "aboutError",
            "Minimum 20 characters required."
        );

        valid = false;

    }
    else {

        showSuccess(about);

    }


    if (valid) {

        document.getElementById("successMsg").innerHTML =
            "Registration Successful! Thank you for registering.";

        form.reset();

        wrongAttempts = 0;

    }

});

function showError(input, errorId, message) {

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");

    document.getElementById(errorId).innerHTML = message;

}

function showSuccess(input) {

    input.classList.remove("errorBorder");
    input.classList.add("successBorder");

}

function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {

        item.innerHTML = "";

    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {

        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");

    });

    document.getElementById("successMsg").innerHTML = "";

}