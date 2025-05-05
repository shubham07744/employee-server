import Employee from "../models/employeeModel.js"
import Leave from "../models/leaveModel.js"

const addLeave = async(req, res)=>{
    try{
    const {userId, leaveType, startDate, endDate, reason} =req.body
    const employee = await Employee.findOne({userId})
    const newLeave = new Leave({
        employeeId : employee._id,
        leaveType,
        startDate,
        endDate,
        reason
    })

    await newLeave.save()
    return res.status(200).json({success : true})

    }catch(error){
        return res.status(500).json({success : false, error: "server error while adding leave"})
    }
}

const getLeave = async (req, res) => {
    try {
        const { id,role } = req.params;
        let leaves;
        if(role === "admin"){
            leaves = await Leave.find({ employeeId: id });
        }else{
            const employee = await Employee.findOne({ userId: id });
            leaves = await Leave.find({ employeeId: employee._id });
        }

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("Error fetching leaves:", error);
        return res.status(500).json({ success: false, error: "server error while getting leaves" });
    }
};


const getLeaves = async(req, res)=>{
    try{
        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate:[
                {
                    path:"department",
                    select:"dep_name"
                },
                {
                    path:"userId",
                    select:"name"
                }
            ]
        })
        
        return res.status(200).json({success : true, leaves})
    }catch(error){
        return res.status(500).json({success : false, error:"server error while getting leaves"})
    }
}

const getLeaveDetail = async(req, res)=>{
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id:id}).populate({
            path:"employeeId",
            populate:[
                {
                    path:"department",
                    select:"dep_name"
                },
                {
                    path:"userId",
                    select:"name profileImage"
                }
            ]
        })
        
        return res.status(200).json({success : true, leave})
    }catch(error){
        return res.status(500).json({success:false, error:"server error while getting leavedetail"})
    }
}

const updateLeave = async(req, res)=>{
    try{
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})

        if(!leave){
            return res.status(404).json({success: false, error:"leave not founded"})
        }
        return res.status(200).json({success: true})

    }catch(error){
        return res.status(500).json({success : false, error:"server error while updating leaveStatus"})
    }
}

export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave}