const loginAttempts = new Map();
function loginRateLimiter(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 5 * 60 * 1000;
    const limit = 5;

    const attempt = loginAttempts.get(ip);

    if (!attempt) {
        loginAttempts.set(ip, { count: 1, expire: now + windowMs });
        return next();
    }

    if (now > attempt.expire) {
        loginAttempts.set(ip, { count: 1, expire: now + windowMs });
        return next();
    }

    if (attempt.count >= limit) {
        const waitSec = Math.ceil((attempt.expire - now) / 1000);
        return res.status(429).json({
            message: `Too many login attempts. Please try again in ${waitSec} second`,
            statusCode: 409
        });
    }

    attempt.count++;
    loginAttempts.set(ip, attempt);
    next();
};
export {
    loginRateLimiter
}
