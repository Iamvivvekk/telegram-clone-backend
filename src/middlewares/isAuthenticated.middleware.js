import { verifyJwt } from "../utils/jwtUtility.js";
export const isAuthenticated = async (req, res, next) => {
  const usertoken = req.headers["authorization"];
  try {
    if (!usertoken)
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized, access denied" });

    let token = usertoken.startsWith("Bearer") ? usertoken.split(" ")[1] : "";

    let secretKey = process.env.JWT_SECRET_KEY;
    let isVerified = await verifyJwt(token, secretKey);
    console.log(isVerified)

    if (!isVerified)
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized, access denied" });

    req.id = isVerified.payload;

    next();
  } catch (error) {
    console.error(error.message);
    console.error("isAuthenticated middleware");
  }
};
