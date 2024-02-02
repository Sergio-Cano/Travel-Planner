const errors = require("../../misc/errors");
const prisma = require("../../prisma");

module.exports = () => async (req, res, next) => {
    const { title, users, services } = req.body;

    const response = await prisma.travels.create({
        data: {
            title,
            users: {
                connect: users.map((user) => ({ email: user }))
            }
        }
    })

    if(!response) return next(errors[500]);
    
    if(services){
        await prisma.services.createMany({
            data: services.map((service) => ({...service, travelId: response.id}))
        })
    }

    res.status(200).json({
        success: true,
        content: response.title
    })
}