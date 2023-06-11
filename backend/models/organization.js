const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
    reg_no: {
      type: String,
      required: true
    },
    Phone_no: {
      type: Number,
      required: true
    },
    email_id: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    upi_id:{
      type:String,
      required:true
    },
    requirement:{
        type:Boolean,
        default:false,
      },
  });

organizationSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

organizationSchema.set('toJSON',{
    virtuals:true,
});

const Organization = mongoose.model('organizations', organizationSchema);
  
  module.exports = Organization;