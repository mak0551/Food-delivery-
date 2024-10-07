const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("tasks", schema);
