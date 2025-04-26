module.exports = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // التأكد من معالجة الـ Preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // إرجاع استجابة فارغة للـ OPTIONS request
  }
  next();
};
