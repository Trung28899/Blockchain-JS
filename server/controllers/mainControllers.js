const getMainPage = async (req, res, next) => {
  res.json({ message: "This is the main Page !!" });
};

export { getMainPage };
