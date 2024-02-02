const errors = require("../../misc/errors");
const prisma = require("../../prisma")

module.exports = () => async (req, res, next) => {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            name: true
        }
    });

    if(!users) return next(errors[500]);

    res.status(200).json({
        success: true,
        content: users
    })
}