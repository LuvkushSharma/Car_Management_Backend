const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  images: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 10;
      },
      message: "A car can have at most 10 images.",
    },
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
