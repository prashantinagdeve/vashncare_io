import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";


// update doctor
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: " Doctor sucessfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(200).json({ success: false, message: " Failed to updated" });
  }
};

// delete doctor
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: " Doctor sucessfully Deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: " Failed to delete" });
  }
};


// we can get single doctor
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: " no doctor found" });
  }
};

// export const getAllDoctor = async(req,res) =>{

//    try {

//     const doctors = await Doctor.find({}).select("-password");

//         res.status(200).
//         json(
//             {
//                 success:true,
//                 message:"Doctor found",
//                 data:doctors
//              })

//    } catch (error) {

//     res.status(404).json({success:false,  message:" not found", })

//    }

//     }

// we can get all doctor
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialazation: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: " not found" });
  }
};

// when we login we go to doctor profle
export const getDoctorProfile= async (req, res)=>{

  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "doctor not found" });
    }

    const { password, ...rest } = doctor._doc;

    const appointments = await Booking.find({doctor:doctorId})

    res.status(200).json({
      success: true,
      message: "  profile info is getting",
      data: { ...rest , appointments},
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong cannot get " });
  }
};

// get my appoitment from user
