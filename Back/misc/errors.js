module.exports = {
    400: {
        statusCode: 400,
        error: new Error('all fields are mandatory'),
    },
    wrong_data: {
        statusCode: 400,
        error: new Error('username or password incorrects'),
    },
    pass_length: {
        statusCode: 400,
        error: new Error('password length must be at least 4'),
    },
    existing_email: {
        statusCode: 400,
        error: new Error('This email already exists'),
    },
    401: {
        statusCode: 401,
        error: new Error('unauthorized'),
    },
    404: {
        statusCode: 404,
        error: new Error('path not found'),
    },
    500: {
        statusCode: 500,
        error: new Error('something went wrong!'),
    }
}