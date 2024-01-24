const prisma = require("../../prisma");
const { hashPass } = require("../../misc/authUtils");
const errors = require("../../misc/errors");

module.exports = () => async (req, res, next) => {
    const { email, username, password } = req.body;

    if(!email || !username || !password) return next(errors[400]);

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