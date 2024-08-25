const jwt = require("jsonwebtoken");
const jwtSecret =
    "3e0ece2c71d9c35045e2f6799292517a90bf1c0155e378b2fe8b319119578b62affa85";

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" });
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized" });
                } else {
                    next();
                }
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" });
    }
};
exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" });
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" });
                } else {
                    next();
                }
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" });
    }
};