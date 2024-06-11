const { Validator } = require("node-input-validator");

module.exports.register = (registerData) => {

    // console.log(registerData)
    const validate = new Validator(registerData, {
        name: "required",
        email: "required|email",
        password: "required",
        confirmPassword: "required|same:password",
        address: "required"
    });

    // console.log(validate, "ssada")
    return validate;

};


module.exports.login = (loginData) => {
    const validate = new Validator(loginData, {
        email: "required|email",
        password: "required"

    });
    return validate;
};
