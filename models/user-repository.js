import DBLocal from "db-local";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { mongoose } from "mongoose";
import conectarDB from "../config/db.js";
const { Schema } = new DBLocal({ path: "./db" });
await conectarDB();
const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },

  //email:String,
  //role:String,
  //createdAt:Date,
  //updatedAt:Date,
});
export const User = mongoose.model("User", UserSchema);
export class UserRepository {
  static async create({ email, name, lastname, username, password, role }) {
    Validation.username(username);
    Validation.password(password);
    const user = await User.findOne({ username });
    console.log("user-repository: ", user);
    if (user) throw new Error("Username already exists");
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({
      _id: id,
      email,
      name,
      lastname,
      username,
      password: hashedPassword,
      role,
    });
    return id;
  }
  static async findAll() {
    const user = User.find({});

    return user;
  }
  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);
    console.log("username login: ", username);
    const user = await User.findOne({ username });

    //console.log(user);
    if (!user) throw new Error("Username does not exist");
    const isvalid = await bcrypt.compare(password, user.password);
    if (!isvalid) throw new Error("password is invalid");
    const { password: _, ...publicUser } = user.toObject();

    return publicUser;
  }
  static async delete(id) {
    // 1. Busca al usuario para verificar si existe (opcional, pero buena práctica)
    const user = await User.findOne({ _id: id });
    console.log("user:", user);
    if (!user) {
      // Lanza un error o devuelve false si no se encuentra
      throw new Error("Username does not exist or was already deleted");
    }
    console.dir(User, { depth: 3 });
    // 2. Usa el método delete() propio de db-local
    await User.deleteOne({ _id: id });

    return true;
  }
  static async update(data) {
    console.log("data: ", data["edit-mail"]);
    console.log("data1: ", data.email);
    console.log("data2: ", data);
    const user = await User.findOne({ email: String(data.email) });
    console.log("user: ", user);
    if (!user) {
      throw new Error("Username does not exist");
    }

    (user.email = data.email),
      (user.name = data.name),
      (user.lastname = data.lastname),
      (user.username = data.username),
      (user.role = data.role),
      user.save();

    return user;
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
