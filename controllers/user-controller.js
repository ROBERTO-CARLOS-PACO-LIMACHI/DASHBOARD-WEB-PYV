import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { UserRepository } from "../models/user-repository.js";
export class UserController {
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserRepository.login({ username, password });
      //console.log("login exitoso");
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .send({ user, token });

      //return user;
    } catch (error) {
      console.log(error.message);
      res.status(401).send(error.message);
    }
  }
}
