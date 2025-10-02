import DBLocal from "db-local";
import crypto from "node:crypto";
import bcrypt from "bcrypt";

const { Schema } = new DBLocal({ path: "./db" });
const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  //email:String,
  //role:String,
  //createdAt:Date,
  //updatedAt:Date,
});
export class UserRepository {
  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);
    const user = User.find({ username });
    //conssole.log(user)
    if (user) throw new Error("Username already exists");
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();
    return id;
  }
  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);
    const user = User.findOne({ username });
    console.log(user);
    if (!user) throw new Error("Username does not exist");
    const isvalid = await bcrypt.compare(password, user.password);
    if (!isvalid) throw new Error("password is invalid");
    const { password: _, ...publicUser } = user;
    return publicUser;
  }
}
class Validation {
  static username(username) {
    if (typeof username !== "string")
      throw new Error("username must be a string");

    if (username.length < 3)
      throw new Error("username must be at least 3 characters long");
  }
  static password(password) {
    if (typeof password !== "string")
      throw new Error("password must be a string");
  }
}
