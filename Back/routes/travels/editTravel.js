const errors = require("../../misc/errors");
const prisma = require("../../prisma");


module.exports = () => async (req, res, next) => {
    const { id } = req.params;
    const { title, connectUsers, disconnectUsers, services } = req.body;
    
    const toConnect = [];

    if(connectUsers){
        for(let user of connectUsers){
            toConnect.push({email: user})
        }
    }

    const toDisconnect = [];

    if(disconnectUsers){
        for(let user of disconnectUsers){
            toDisconnect.push({email: user})
        }
    }

    if(services){
        await prisma.services.deleteMany({
            where: {
                travelId: id
            }
        })

        const travelServices = services.map((service) => {
            return {...service, travelId: id}
        })

        await prisma.services.createMany({
            data: travelServices
        })
    }

    const response = await prisma.travels.update({
        where: {
            id
        },
        data: {
            title,
            users: {
                connect: toConnect,
                disconnect: toDisconnect
            }
        },
        select: {
            title: true,
            services: true
        }
    })

    if(!response) return next(errors[500]);

    res.status(200).json({
        success: true,
        response
    })
}