// Password Validation regex {
const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const lengthRegex = /.{6,}/;
// Password Validation regex }

// Email validation regex {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Email validation regex }



export { uppercaseRegex, lowercaseRegex, lengthRegex, emailRegex }