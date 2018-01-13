
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../../models";

async function auth(payload: any, done: (error: any, user?: any, options?: any) => void): Promise<void> {
  User
    .findOne({ username: payload.username })
    .then(user => {
      if (!user) {
        return done(null, false, "Incorrect username.");
      }
      return done(null, user);
    })
    .catch(done);
}

export default new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, auth);
