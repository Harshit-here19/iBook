// eslint-disable
const jwt = require("jsonwebtoken")
const JWT_SECRET = "ILOVEM@M";

const fetchuser = (req, res, next) => {
    //TODO: Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next();
    } catch (err) {
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }
}

module.exports = fetchuser;