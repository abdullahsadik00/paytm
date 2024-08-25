import mongoose from "mongoose";
mongoose.connect(
    'mongodb+srv://sadik:Sadik%403012@cluster0.7v7sara.mongodb.net/paytm'
  );
const {Schema} = mongoose;  

const userSchema = new Schema({
 usename:String,
 password:String,firstname:String,
 lastname:String

})

const User = mongoose.model('User',userSchema)

module.exports={
    User
}