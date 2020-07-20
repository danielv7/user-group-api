//Validation
const Joi = require('@hapi/joi');


//Register validaiton
const registerValidation = (data) => {
    const schema = Joi.object({ 
        name: Joi.string() .min(6) .required(),
        userEmail: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() }
    );
    return schema.validate(data);

};

//login validaiton
const loginValidation = (data) => {
    const schema = Joi.object({ 
        userEmail: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() }
    );
    return schema.validate(data);
};

//creating group validaiton
const groupValidation = (data) => {
    const schema = Joi.object({ 
        groupName: Joi.string() .min(3) .required() }
    );
    return schema.validate(data);
};

const memberValidation = (data) => {
    const schema = Joi.object({ 
        email: Joi.string() .required() }
    );
    return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.groupValidation = groupValidation;
module.exports.memberValidation = memberValidation;