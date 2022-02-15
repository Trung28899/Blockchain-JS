import Auth from "../models/authModel.js";

/*
  C in CRUD
*/
const createPassword = async (req, res, next) => {
  const password = req.body.password;
  const newAuth = new Auth({ password: password });
  try {
    await newAuth.save();
    res.status(201).json(newAuth);
  } catch (err) {
    res.status(409).json({ message: error.message });
  }
};

/*
  R in CRUD
*/
const getPassword = async (req, res, next) => {
  const password = req.body.password;
  try {
    const authData = await Auth.find({ password: password });
    if (authData.length === 0) {
      res.json({ validated: false });
    } else {
      res.json({ validated: true });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/*
  U in CRUD
*/
const updatePassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const { currentPassword } = req.params;
  try {
    const authData = await Auth.find({ password: currentPassword });
    if (authData.length > 0) {
      const id = authData[0]._id;
      await Auth.findByIdAndUpdate(
        id,
        { password: newPassword },
        { new: true, useFindAndModify: false }
      );
      res.json({ passwordUpdated: true });
    } else {
      res.json({ passwordUpdated: false });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/*
  D in CRUD
*/
const deletePassword = async (req, res, next) => {
  const { password } = req.params;
  try {
    const authData = await Auth.find({ password: password });
    if (authData.length > 0) {
      const id = authData[0]._id;
      await Auth.findByIdAndRemove(id);
      res.json({ passwordDeleted: true });
    } else {
      res.json({ passwordDeleted: false });
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export { createPassword, getPassword, updatePassword, deletePassword };
