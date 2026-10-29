function isStrongPassword(password) {
    const hasLength = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\[\]{}|\\<>?]/.test(password);
    const hasNoPasswordWord = !/password/i.test(password);

    if (
        hasLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialCharacter &&
        hasNoPasswordWord
    ) {
        console.log("Strong Password");
        return true;
    } else {
        console.log("Weak Password");
        return false;
    }
}

const password = prompt("Enter a password:");
isStrongPassword(password);