import Link from "../models/linkModel.js";

const createLink = async (req, res, next) => {
  const { accessName, redirectLink } = req.body;
  try {
    const linkRecord = await Link.find({ accessName: accessName });
    if (linkRecord.length === 0) {
      const newLink = new Link({
        accessName: accessName,
        redirectLink: redirectLink,
      });
      newLink.save();
      res.json({ linkCreated: true, error: false });
    } else {
      res.json({ linkCreated: false, error: false });
    }
  } catch (err) {
    res.status(409).json({ linkCreated: false, error: err.message });
  }
};

const fetchLink = async (req, res, next) => {
  const { accessName } = req.params;
  try {
    const linkRecord = await Link.find({ accessName: accessName });
    if (linkRecord.length > 0) {
      res.json({ redirectLink: linkRecord[0].redirectLink, error: false });
    } else {
      res.json({ redirectLink: null, error: true });
    }
  } catch (err) {
    res.status(409).json({ redirectLink: null, error: err.message });
  }
};

const getMainPage = async (req, res, next) => {
  res.json({ message: "This is the main Page !!" });
};

export { createLink, fetchLink, getMainPage };
