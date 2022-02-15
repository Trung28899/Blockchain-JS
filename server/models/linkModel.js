import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
  accessName: String,
  redirectLink: String,
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
