import DepartmentModel from "../models/departmentModel.js";

const getDepartments = async(req, res)=>{
    try{
        const departments = await DepartmentModel.find()
        return res.status(200).json({success:true, departments})
    }catch(error){
        return res.status(500).json({success: false, error: "server error while getting departments"})
    }
}

const addDepartment =async (req, res)=>{
    try {
        const {dep_name, description} = req.body;
        const newDep = new DepartmentModel({
            dep_name, 
            description
        })
        await newDep.save();
        res.status(200).json({success: true, department : newDep});
    } catch (error) {
        return res.status(500).json({success: false, error: "Server error while adding department"})
    }
}

const getDepartment =async (req, res)=>{
    try{
        const {id} = req.params;
        const department = await DepartmentModel.findById({_id : id})
        return res.status(200).json({success: true, department})
    }catch(error){
        return res.status(500).json({success: false, error:"Server error while editing department"})
    }
}

const updateDepartment =async (req, res)=>{
    try{
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDep = await DepartmentModel.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        })
        return res.status(200).json({success: true, updateDep})
    }catch(error){
        return res.status(500).json({success: false, error:"Server error while updating department"})
    }
}

const deleteDepartment =async (req, res)=>{
    try{
        const {id} = req.params;
        const deleteDep = await DepartmentModel.findById({_id:id})
        await deleteDep.deleteOne()

        return res.status(200).json({success: true, deleteDep})
    }catch(error){
        return res.status(500).json({success: false, error:"Server error while deleting department"})
    }
}

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}