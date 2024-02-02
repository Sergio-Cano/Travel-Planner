const errors = require("../../misc/errors");
const prisma = require("../../prisma");

module.exports = () => async (req, res, next) => {
    const { id } = req.params;

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
        response
    })
}