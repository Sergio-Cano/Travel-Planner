const prisma = require("../../prisma");
const { serializeToken, comparePass } = require("../../misc/authUtils");
const errors = require("../../misc/errors");

module.exports = () => async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) return next(errors[400]);

    const response = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!response) return next(errors.wrong_data);

    const passCheck = await comparePass(password)(response.password);

    if(!passCheck) return next(errors.wrong_data);

    const payload = {
        id: response.id,
        email: response.email,
        name: response.name,
    }

    await serializeToken(res, payload)

    res.status(200).json({
        success: true
    });
}
