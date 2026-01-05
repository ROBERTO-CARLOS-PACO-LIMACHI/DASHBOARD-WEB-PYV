import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { UserRepository } from "../models/user-repository.js";
export class UserController {
  static async login(req, res) {
    print("req body: ", req.body)
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
  static async findAll(req, res) {
    const users = await UserRepository.findAll();
    console.log(users);
    res.json(users);
  }
  static async delete(req, res) {
    console.log("deleteuser: ", req.params);
    const { id } = req.params;
    console.log("deleteuser: ", id);
    const result = await UserRepository.delete(id);
    if (result == false) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ message: "user deleted" });
  }
  static async update(req, res) {
    console.log("hola update user");
    const {
      "edit-email": email,
      "edit-name": name,
      "edit-lastname": lastname,
      "edit-username": username,
      "edit-role": role,
    } = req.body;
    console.log("req.body: ", req.body);
    console.log("req.params: ", req.params);

    const data = {
      email: email,
      name: name,
      lastname: lastname,
      username: username,
      role: role,
    };
    const response = await UserRepository.update(data);
    if (response) {
      return res.json({ message: "user updated" });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  }
}
