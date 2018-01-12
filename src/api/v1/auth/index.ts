
import { Request, Response, NextFunction } from "express";
import { authenticate } from "passport";

export default (req: Request, res: Response, next: NextFunction) => {
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
      return res.json(user);
    });
  })(req, res, next);
};