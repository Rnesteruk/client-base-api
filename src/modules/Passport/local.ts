import { Strategy } from "passport-local";
import { User } from "../../models";

async function auth (username: string, password: string, done: (error: any, user?: any, options?: any) => void): Promise<void> {
    User
      .findOne({ username })
      .then(async user => {
        if (!user) {
          return done(null, false, "Incorrect username.");
        }
        const isValid = await user.validPassword(password);
        if (!isValid) {
          return done(null, false, "Incorrect password.");
        }
        return done(null, user);
      })
      .catch(done);
}

export default new Strategy(auth);
