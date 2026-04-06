import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    minLength: 6,
    required: function () { return this?.authProvider === 'local'; },
},
bio: {type: String, default: ""},
location: {type: String, default: ""},
website: {type: String, default: ""},
isAccountVerified: {type: Boolean, default: false},
verificationCode: {type: String, default: 0},
verificationCodeExp: Date,
resetPasswordOtp: {type: String, default: ""},
resetPasswordOtpExpireAt: {
    type: Number,
    default: 0
},
resetPasswordToken: {type: String, default: ""},
resetPasswordTokenExpireAt: {type: Date},
avatar:{
    type:String,
    default: ""
}, 
isOnline: Boolean,

projects: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
lastOpenedProject: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},

sessionsJoined: [String],
recentAIQueries:[String],
authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
}

}, {timestamps:true});

export const User = mongoose.model("User", UserSchema)