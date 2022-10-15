const GoogleStrategy = require("passport-google-oauth20").Strategy;

function initialize(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            passReqToCallback: true,
            scope: ["profile", "email"],
        },
        function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}

module.exports = initialize;
