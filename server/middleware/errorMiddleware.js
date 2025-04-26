module.exports = (err, req, res, next) => {
  for (const error in err.errors) {
    console.log(err[error]?.message);
  }
  console.log(err);
  res.status(500).send("Server internal error");
};
