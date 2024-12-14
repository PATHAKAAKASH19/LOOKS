import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    
   
   

    email: { 
        type: String,
        required: true,
        unique: true
    },

   

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },

    name: {
        type:String,
        
    }, 

    phone: {
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    }





    


}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User