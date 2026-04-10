const jwt = require("jsonwebtoken");

function authenticateJWt(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
        res.status(401).json({error: "Access denied, access token missing"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }
    catch (error){
        res.status(400).json({error: "JWT verification failed " + error})
    }
}

module.exports = authenticateJWt;