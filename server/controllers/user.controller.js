import { Room } from '../models/room.model.js';
import {User} from '../models/user.model.js';

export const getUserData = async(req, res)=>{
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).select("-password -__v -resetPasswordOtp -resetPasswordOtpExpireAt -verificationCode -VerificationCodeExp");
        if(!user){
           return res.status(404).json({
               success:false,
               message:"User not found"
           })
        }

        return res.status(200).json({
            success:true,
            user
        }) 
        
    } catch (error) { 
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
        })
    }
}

export const updateUserProfile = async(req, res)=>{
    try {
        const userId = req.user.id;
        const {username, website, bio, location} = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            username,
            website,
            bio,
            location
        }, {new:true, runValidators:true}).select("-password -__v -resetPasswordOtp -resetPasswordOtpExpireAt -verificationCode -VerificationCodeExp");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
        })
    }
}

export const getUserStats = async(req, res)=>{
    try {
        const userId = req.user.id;

        const [created, collaborations] = await Promise.all([
            Room.countDocuments({createdBy:userId}),
            Room.countDocuments({
                createdBy: {$ne:userId},
                "participants.userId":userId,
            })
        ])
        return res.status(200).json({
            success:true,
            stats:{
                created,
                collaborations
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}