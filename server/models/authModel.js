import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  password: String,
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
