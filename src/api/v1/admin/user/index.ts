import { Request, Response, NextFunction } from "express";
import { User } from "../../../../models";

export {
  register,
  getUsers,
};

async function register(req: Request, res: Response, next: NextFunction) {
  req.assert("username", "Username cannot be blank").notEmpty();
  req.assert("password", "Password cannot be blank").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  return isExists(user.username)
    .then((exists: boolean): any => {
      if (exists) {
        res.status(401);
        throw new Error("username already exists");
      }
      return user.save();
    })
    .then(data => res.json(data))
    .catch(next);
}

function isExists(username: String): Promise<boolean> {
  return User.findOne({ username })
    .then(user => !!user);
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  return User.find({})
    .then(data => res.json(data))
    .catch(next);
}