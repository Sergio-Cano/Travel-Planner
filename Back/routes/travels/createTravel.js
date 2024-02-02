const errors = require("../../misc/errors");
const prisma = require("../../prisma");

module.exports = () => async (req, res, next) => {
    const { title, users, services } = req.body;

    console.log(users)

    const response = await prisma.travels.create({
        data: {
            title,
            users: {
                connect: users ? users.map((user) => ({ email: user })) : []
            }
        }
    })

    if(!response) return next(errors[500]);
    
    if(services){
        const travelServices = services.map((service) => {
            return {...service, travelId: response.id}
        })

        await prisma.services.createMany({
            data: travelServices
        })
    }

    res.status(200).json({
        success: true,
        response
    })
}