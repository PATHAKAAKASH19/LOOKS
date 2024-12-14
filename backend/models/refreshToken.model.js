import mongoose from "mongoose"


const refreshTokenSchema = mongoose.Schema({

    refreshToken : {
        type: String,
        required: true,
        
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
       
    },

    createdAt: {
        type: Date,
        default: Date.now,
        index: {expires: "7d"}
    }
})

const RefreshToken = mongoose.model("RefreshToken" , refreshTokenSchema)

export default RefreshToken 


