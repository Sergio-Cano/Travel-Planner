const authorizer = require("../../misc/authorizer");
const errors = require("../../misc/errors");
const prisma = require("../../prisma");

module.exports = () => async (req, res, next) => {
    const { id } = req.params;
    const user = res.locals;

    const authorized = await authorizer(id, user);

    if(!authorized) return next(errors[401]);

    await prisma.services.deleteMany({
        where: {
            travelId: id
        }
    })

    const response = await prisma.travels.delete({
        where: {
            id
        },
    });

    if(!response) return next(errors[500]);

    res.status(200).json({
        success: true,
        content: response.title
    })
}