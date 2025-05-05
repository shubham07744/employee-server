
import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
    employeeId : {type: String, required: true, unique: true},
    dob : {type: Date},
    gender : {type: String},
    maritalStatus : {type:String, required:true},
    designation : {type:String},
    department:{type:Schema.Types.ObjectId, ref:"Department", required:true},
    salary : {type: Number, required:true},
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;