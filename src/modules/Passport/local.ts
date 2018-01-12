import { User } from "../../models";

export default (username: string, password: string, done: (error: any, user?: any, options?: any) => void): void => {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, "Incorrect username.");
      }
      if (!user.validPassword(password)) {
        return done(null, false, "Incorrect password.");
      }
      return done(null, user);
    });
};