const errors = require("../../misc/errors");
const prisma = require("../../prisma");

module.exports = () => async (req, res, next) => {
    const user = res.locals;

    const travels = await prisma.travels.findMany({
        where: {
            users: {
                some: { id: { equals: user.id }}
            }
        },
        include: {
            users: true
        }
    });

    if(!travels) return next(errors[500]);

    res.status(200).json({
        success: true,
        content: travels
    })
}