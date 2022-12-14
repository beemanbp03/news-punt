const registerValidation = document.getElementById('registerForm') ? new window.JustValidate('#registerForm') : null;
const loginValidation = document.getElementById('loginForm') ? new window.JustValidate('#loginForm') : null;


if (registerValidation) {
    console.log("registerValidation = " + registerValidation);

    registerValidation
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Email is required',
        },
        {
            rule: 'email',
            errorMessage: 'Email is invalid',
        }
    ])
    .addField('#password', [
        {
            rule: 'required',
            errorMessage: 'Must type in a password',
        },
        {
            rule: 'strongPassword',
            errorMessage: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
    ])
    .addField('#confirmPassword', [
        {
            validator: (value, fields) => {
                if (fields['#password'] && fields['#password'].elem) {
                    const repeatPasswordValue = fields['#password'].elem.value;

                    return value === repeatPasswordValue;
                }
                return true;
            },
            errorMessage: 'Passwords should match',
        },
        {
            rule: 'required',
            errorMessage: 'Must type in a password',
        },
        {
            rule: 'strongPassword',
            errorMessage: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        }
    ])
    .onSuccess((event) => {
        console.log("Validation Sucessfull, submitting register form");
        document.getElementById('registerForm').submit();
    })
}

if (loginValidation) {
    console.log("loginValidation = " + loginValidation);

    loginValidation
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Email is required',
        },
        {
            rule: 'email',
            errorMessage: 'Email is invalid'
        }
    ])
    .addField('#password', [
        {
            rule: 'required',
            errorMessage: 'Must type in a password',
        },
        {
            rule: 'strongPassword',
            errorMessage: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        }
    ])
    .onSuccess((event) => {
        console.log("Validation Successfull, submitting login form")
        document.getElementById('loginForm').submit();
    });
}