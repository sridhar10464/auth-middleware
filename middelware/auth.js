const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const User = require("../models/userModel");


const jwtExpiresIn = "1h";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtSecret = process.env.JWT_SECRET_KEY;
const jwtAlgorithm = "HS256";

// configure passport with JWT strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            algorithms: [jwtAlgorithm],
        },
        async (payload, done) => {
            try {
                // check if the user exists
                const user = await User.findById(payload.sub);

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);


// Middleware to auhtenticate requests using JWT
const authenticateJWT = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user) =>
    {
        if (!error || user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    })(req, res, next);
};

// Generate a JWT token
const generateToken = user => {
    const payload = {
        sub: user._id,
        iat: Date.now(),
    };

    return jwt.sign(payload, jwtSecret, {
        algorithm: jwtAlgorithm,
        expiresIn: jwtExpiresIn,
    });
};

module.exports = { authenticateJWT, generateToken };