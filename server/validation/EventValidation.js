const { Validator } = require("node-input-validator");

module.exports.createEvent = (data) => {
    const validate = new Validator(data, {
        title: "required",
        description: "required",
        participants: "required",
        startdate: "required",
        enddate: "required"
    });
    return validate;
};

module.exports.editEvent = (data) => {
    const validate = new Validator(data, {
        title: "required",
        description: "required",
        participants: "required",
        startdate: "reuqired",
        enddate: "required"

    });

    return validate;
};
