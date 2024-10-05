const mongoose = require("mongoose");
const schema = mongoose.Schema({
  firstname: {
    type: String,
    minlength: [3, "firstname should be minimum of 3 characters"],
  },
  lastname: {
    type: String,
    minlength: [3, "lastname should be minimum of 3 characters"],
  },
  email: { 
    type: String, 
    unique: [true, 'email already exist'], 
    required: [true, "email mandatory"] },
  number: { 
    type: String, 
    unique: [true, 'number already exist'], 
    required: [true, "number mandatory"] },
});
module.exports = mongoose.model("usermodels", schema);
