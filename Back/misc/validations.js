const prisma = require("../prisma");

const signupValidation = async (email, username, password) => {
    const validationErrors = {};

    if(!email || !username || !password){
        validationErrors.empty_inputs = true;
    };

    const emailCheck = await prisma.user.findUnique({
        where: { email },
        select: {
            email: true,
            name: true
        }
    });

    if(email === emailCheck?.email){
        validationErrors.existing_email = true;
    };

    if(password.length < 4){
        validationErrors.pass_length = true;
    };

    return validationErrors;
}

module.exports = {
    signupValidation,
}