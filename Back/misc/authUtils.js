const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
}

const comparePass = (plain) => async (hash) => {
    return await bcrypt.compare(plain, hash);
};

const serializeToken = async (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + (60 * 60 * 1000)),
      secure: true,
      httpOnly: true,
    });
}

const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("> [verify]: ", error.message);
      return false;
    }
};

const deserializeToken = (req) => {
    const { access_token } = req?.cookies || {};
    const payload = verifyToken(access_token);
    if (!payload) return false;
    return payload;
};

const clearCookie = (res) => {
  res.clearCookie("access_token");
};

module.exports = {
    hashPass,
    comparePass,
    serializeToken,
    deserializeToken,
    clearCookie
}