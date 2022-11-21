const GoogleStrategy = require("passport-google-oauth20").Strategy;
var User = require("./models/user");

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

            User.findOne({
                'google_id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                // No user was found, so create one:
                if (!user) {
                    user = new User(
                    {
                        google_id: profile.id,
                        email: profile.emails[0].value,
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName
                    })
                    .save( function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            })
        }   
    ))

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id , function( err, user ) {
            if (err) return err;
            return done(null, user);
        })
    })
}

module.exports = initialize;
