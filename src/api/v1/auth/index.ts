import { Request, Response, NextFunction } from "express";
import { authenticate } from "passport";

export {
  login,
  auth,
};

function auth() {
  return authenticate("jwt", { session: false });
}

function login(req: Request, res: Response, next: NextFunction) {
  req.assert("username", "Username cannot be blank").notEmpty();
  req.assert("password", "Password cannot be blank").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors });
  }
  authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      res.status(401);
      return next(new Error(info));
    }
    req.login(user, { session: false }, (err) => {
      if (err) { return next(err); }
      return res.json(user.toObject({ virtuals: true }));
    });
  })(req, res, next);
}
