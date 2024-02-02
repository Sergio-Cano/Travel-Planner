const authorizer = require("../../misc/authorizer");
const errors = require("../../misc/errors");
const prisma = require("../../prisma");

module.exports = () => async (req, res, next) => {
    const { id } = req.params;
    const { title, connectUsers, disconnectUsers, services } = req.body;
    const user = res.locals;

    const authorized = await authorizer(id, user);

    if(!authorized) return next(errors[401]);
    
    if(services){
        await prisma.services.deleteMany({
            where: {
                travelId: id
            }
        })

        await prisma.services.createMany({
            data: services.map((service) => ({...service, travelId: id}))
        })
    }

    const response = await prisma.travels.update({
        where: {
            id
        },
        data: {
            title,
            users: {
                connect: connectUsers ? connectUsers.map((user) => ({ email: user })) : [],
                disconnect: disconnectUsers ? disconnectUsers.map((user) => ({ email: user })) : []
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
        content: response.title
    })
}