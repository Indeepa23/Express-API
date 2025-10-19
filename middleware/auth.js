import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Access denied" });
    
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, "mysupersecretkey123", { expiresIn: '1h' });
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
}

export default auth;