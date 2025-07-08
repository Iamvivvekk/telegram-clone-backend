import User from "../../models/user.model.js";

export const updateProfile = async (req, res) => {
  // let user   = res.user
};
export const updateMobile = async (req, res) => {
  const { mobile } = req.body;

  console.log(typeof mobile);

  try {
    if (mobile && mobile.length >= 10) {
      await User.findByIdAndUpdate(req.id, { $set: { mobile } });
      return res.status(200).json({
        success: true,
        message: "mobile updated successful",
        data: mobile,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
