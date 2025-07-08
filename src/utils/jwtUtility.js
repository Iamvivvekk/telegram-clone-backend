import jwt from "jsonwebtoken";

export const generateToken = async (payload, secretKey) => {
  try {
    const token = jwt.sign({ payload }, secretKey, {
      expiresIn: 60 * 60 * 24 * 10,
    });
    if (token) return token;
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyJwt = async (token, secretKey) => {
  try {
    return await jwt.verify(token, secretKey);
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
