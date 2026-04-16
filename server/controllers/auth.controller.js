import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import generatToken from "../utils/generateToken.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { googleAuthService } from "../services/googleAuth.service.js";
dotenv.config();

import transporter from "../config/nodemailer.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }

    if(password.length < 6){
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "You already have an account",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode: otp,
      verificationCodeExp: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newUser.save();
    const token = generatToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "lax",
    });

    await newUser.save();

    const mailOtp = {
      from: process.env.SENDER_EMAIL,
      to: newUser.email,
      subject: "Verify your account",
      text: `Codeva welcomes you ${newUser.username}. Your OTP is ${otp}. Verify Your account`,
    };
    await transporter.sendMail(mailOtp);

    return res.status(201).json({
      success: true,
      message:
        "Account created. Please verify your account with the OTP send to your email",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAccountVerified: newUser.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("eroor message", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    }

    if(user.authProvider === "google"){
      return res.status(400).json({
        message: "Please login with Google",
      });
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    }
    let token = generatToken(user);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${user.username}`,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAccountVerified: user.isAccountVerified,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user.isAccountVerified) {
      return res.status(404).json({
        success: false,
        message: "Accout already verified",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = otp;
    user.verificationCodeExp = new Date(Date.now() + 60 * 60 * 1000);

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `Your OTP is ${otp}. verify Your accout`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Verification OTP has been sent",
    });
  } catch (error) {
    console.log("hey guys", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const verificationCode = otp;
    const userId = req.user.id;

    if (!userId || !verificationCode) {
      return res.status(404).json({
        success: false,
        message: "Missing required details",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(typeof user.verificationCode);
    console.log(typeof verificationCode);

    if (
      user.verificationCode === "" ||
      user.verificationCode !== verificationCode
    ) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    if (user.verificationCodeExp < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.isAccountVerified = true;
    user.verificationCode = "";
    user.verificationCodeExp = 0;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Account verfied successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      }, 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email:", email);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if(user.authProvider === "google"){
      return res.status(400).json({
        success: false,
        message: "You cannot reset password for this account",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpireAt = Date.now() + 10 * 60 * 1000;

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Password OTP",
      text: `Your OTP is ${otp}. Reset your Password`,
    };
    await user.save();
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyResetPasswordOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
   
    if(!otp || !email){
      return res.status(400).json({
        success: false,
        message: "Email and Otp are required",
      })
    }

    const user = await User.findOne({ email })

    if(!user){
      return res.status(404).json({
        success: false,
        message: "Invalid request",
      })
    }

    if(user.resetPasswordOtp === "" || user.resetPasswordOtp !== otp){
      return res.status(403).json({
        success: false,
        message: "Otp is incorrect",
      })
    }

    if(user.resetPasswordOtpExpireAt < Date.now()){
      return res.status(403).json({
        success: false,
        message: "Otp has expired",
      })
     }

     const resetToken = crypto.randomBytes(32).toString("hex");

     const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

     user.resetPasswordToken = hashedResetToken;
     user.resetPasswordTokenExpireAt = Date.now() + 10 * 60 * 1000;
     user.resetPasswordOtp = "";
     user.resetPasswordOtpExpireAt = 0;
     await user.save();

      return res.status(200).json({
        success: true,
        resetToken,
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    console.log("resetToken:", resetToken);
    console.log("newPassword:", newPassword);
    if (!newPassword || !resetToken) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }
    
    if(newPassword.length < 6){
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashedResetToken,  resetPasswordTokenExpireAt:{ $gt: new Date()} });

    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    user.resetPasswordToken = "";
    user.resetPasswordTokenExpireAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    let { code } = req.body;
    console.log("code:", code);
        const userData = await googleAuthService(code);

        const { email, name, picture } = userData;


        console.log("Google user data:", { email, name, picture });
        let user = await User.findOne({ email });
        if (!user){
         user = await User.create({
            username: name,
            email,
            avatar: picture,
            isAccountVerified: true,
            authProvider: "google",
          })
        }

        const token = generatToken( user );

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "strict",
        });

        const message = user.isNew ? "Account created successfully" : `Welcome back ${user.username}`;

        return res.status(200).json({
          success: true,
          message,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            isAccountVerified: user.isAccountVerified,
          },
        });


  } catch (error) {
      console.error("Google authentication error:", error.response?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}