module.exports = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.AUTH_SECRET);
                if (decoded) {
                    next();
                } else {
                    res.json({err: "Authentication failed!", status: 402})
                }
            } catch(err) {
                // err
                res.json({err: "Invalid Token", status: 402})
            }
        } else {
            // response error with status 400;
            res.json({err: "You need to be logged in to make this request. No token found.", status: 403})
        }
    }
}