const prisma = require("../../prisma");
const { hashPass } = require("../../misc/authUtils");
const errors = require("../../misc/errors");
const { signupValidation } = require("../../misc/validations");

module.exports = () => async (req, res, next) => {
    const {email, username, password} = req.body;

    const validationErrors = await signupValidation(email, username, password);

    if(validationErrors?.empty_inputs) return next(errors[400]);
    if(validationErrors?.existing_email) return next(errors.existing_email);
    if(validationErrors?.pass_length) return next(errors.pass_length);
    
    const hashedPassword = await hashPass(password);

    const response = await prisma.user.create({
        data: {
            email,
            name: username,
            password: hashedPassword
        }
    })

    if(!response) return next(errors[500]);

    res.status(200).json({
        success: true,
        message: `Welcome ${response.name}`
    })
}