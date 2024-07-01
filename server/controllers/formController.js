const catchAsyncError = require('../middleware/catchAsyncError')
const Form = require('../models/formModel')

const createForm = catchAsyncError(async (req, res, next) => {
    const { rationaleSummary, rationaleText, enable, groupID, sequence } = req.body

    const formData = { rationaleSummary, rationaleText, enable, groupID, sequence }

    const form = await Form.create(formData)

    res.status(200).json({
        success: true,
        form
    })

})


const getForm = catchAsyncError(async (req, res, next) => {
    const form = await Form.find().sort({createdAt : -1})

    res.status(200).json({
        success: true,
        form
    })

})


const getSingleForm = catchAsyncError(async(req, res, next)=>{
    const formId = req.params.id
    
    const form = await Form.findById(formId)

    if (!form) {
        return res.status(404).json({
            success: false,
            message: 'Form not found'
        });
    }

    res.status(200).json({
        success : true,
        form
    })
})


const updateForm = catchAsyncError(async(req, res, next)=>{
    const formId = req.params.id
    const { rationaleSummary, rationaleText, enable, groupID, sequence } = req.body;
    const formData = { rationaleSummary, rationaleText, enable, groupID, sequence }

    const form = await Form.findByIdAndUpdate(formId, formData, {new : true})


    if (!form) {
        return res.status(404).json({
            success: false,
            message: 'Form not found'
        });
    }

    res.status(200).json({
        success : true,
        form
    })
})


const deleteForm = catchAsyncError(async(req, res, next)=>{
    const formId = req.params.id
    const form = await Form.findByIdAndDelete(formId)

    if (!form) {
        return res.status(404).json({
            success: false,
            message: 'Form not found'
        });
    }
    
    res.status(200).json({
        success : true,
        message : 'Form Deleted Successfully'
    })
})

module.exports = {
    createForm,
    getForm,
    getSingleForm,
    updateForm,
    deleteForm
}