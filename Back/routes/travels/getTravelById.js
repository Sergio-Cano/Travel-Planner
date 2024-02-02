const errors = require("../../misc/errors");
const prisma = require("../../prisma");


module.exports = () => async (req, res, next) => {
    const { id } = req.params;

    const travel = await prisma.travels.findFirst({
        where: {
            id
        }
    })

    if(!travel) return next(errors[500]);
    
    res.status(200).json({
        success: true,
        content: travel
    })
}