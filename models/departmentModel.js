import mongoose from "mongoose";
import Employee from "./employeeModel.js";
import Leave from "./leaveModel.js";
import Salary from "./salaryModel.js";

const departmentSchema = new mongoose.Schema({
    dep_name:{type: String , required: true},
    description : {type:String},
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: Date.now},
})

departmentSchema.pre("deleteOne", {document: true, query: false}, async function(next){
    try{
        const employee = await Employee.find({department: this._id})
        const empIds = employee.map(emp => emp._id)

        await Employee.deleteMany({department: this._id})
        await Leave.deleteMany({employeeId: {$in : empIds}})
        await Salary.deleteMany({employeeId: {$in : empIds}})
        next()
    }catch(error){
        next(error)
    }
})

const DepartmentModel = mongoose.model("Department", departmentSchema);
export default DepartmentModel;