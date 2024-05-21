import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User sucessfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(200).json({ success: false, message: " Failed to updated" });
  }
};
// user delete
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User sucessfully Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: " Failed to delete" });
  }
};
// we can get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: " no user found" });
  }
};
// we can get all user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: " not found" });
  }
};

// when we login we go to user profle
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "  user not found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "  profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong cannot get " });
  }
};

// get my appoitment

export const getMyAppointments = async (req, res) => {
  try {
    // step 1 - retrive appoitment from booking for specific user

    const bookings = await Booking.find({ user: req.userId });

    // step 2 - extact doctor id from appoitments  bookings

    const doctorIds = bookings.map((el) => el.doctor.id);

    // step 1 - retrive doctors using doctor id

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res
      .status(200)
      .json({
        success: true,
        message: "appoitments are getting",
        data: doctors,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong cannot get " });
  }
};
