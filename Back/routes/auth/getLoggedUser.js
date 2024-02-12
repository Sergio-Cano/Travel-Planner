

module.exports = () => async (req, res, next) => {
    res.status(200).json({
        success: true,
        content: res.locals
    })
}