const prisma = require("../prisma");

module.exports = async (id, user) => {
    const travel = await prisma.travels.findFirst({
        where: {
            id
        },
        include: {
            users: {
                select: {
                    email: true
                }
            }
        }
    })

    const authorizedUser = travel.users.filter((travelUser) => travelUser.email === user.email);
    
    return authorizedUser.length > 0;
}