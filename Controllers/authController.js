import User from '../models/UserSchema.js'
import Docter from '../models/DoctorSchema.js'
import  jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken = user=>{
    return jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET_KEY,{
        expiresIn:"15d",
    })
}

export const register = async(req,res)=>{

    const { email ,password ,name,role,photo,gender} = req.body

    try {

        let user = null
        if(role === 'patient'){
           user =  await User.findOne({email})
        }else if(role === "docter"){
            user = await Docter.findOne({email})
        }

        // check if user exist
        if(user){
            return res.status(400).json({message:'user alredy exist'})
        }

         // hash password

         const salt = await bcrypt.genSalt(10)
         const hashpassword = await bcrypt.hash(password, salt)

         if(role==='patient'){
            user = new User({
                name,
                email,
                password:hashpassword,
                photo,
                gender,
                role
            })
         }

         if(role==='doctor'){
            user = new Docter({
                name,
                email,
                password:hashpassword,
                photo,
                gender,
                role
            })
         }
         
         await user.save()
         res.status(200).json({success:true , message:'user created sucessfully'})


        
    } catch (error) {
        res.status(500).json({success:false , message:'internal server error , try again 😔'})
        
    }

}
export const login = async(req,res)=>{

    const {email,} = req.body
    
    try {
        let user = null
        const patient = await User.findOne({email})
        const docter = await Docter.findOne({email})
        if(patient){
            user = patient
        }
        if(docter){ 
            user = docter
        }
        
    //  if user exist or not

    if(!user){
        return res.status(404).json({message:'user not found'})
    }

    //  compare password 

    const isPasswordMatch =  await bcrypt.compare(req.body.password , user.password)

    if(!isPasswordMatch) {
        return res.status(400).json({status:false, message:"invalid password"})
    }

     
    // get token

    const token = generateToken(user)


    const {password,role, appointments, ...rest} = user._doc
    res.status(200).json({success:true , message:'sucessfully Loging😍',token , data:{...rest},role})
    
    } catch (error) {

        res.status(500).json({success:false , message:'fail to login 😔'})
        
    }

}