const prisma = require("../../prisma");
const errors = require("../../misc/errors");

module.exports = () => async (req, res, next) => {    
    const travels = await prisma.travels.findMany({
        include: {
            users: {
                select: {
                    email: true,
                    name: true
                }
            },
            services: true
        }
    });

    if(!travels) return next(errors[500]);

    res.status(200).json({
        success: true,
        content: travels
    })
}