const authchk = (req, res, next) => {
  if (req.headers["accesstoken"] === undefined) {
    res.status(404).send("usernot authorized");
    return;
  }
  next();
};

export { authchk };
