const Car = require("../models/carModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create Car
exports.createCar = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;

  // Check if the number of images exceeds the limit
  if (req.body.images && req.body.images.length > 10) {
    return next(new AppError("A car can have at most 10 images.", 400));
  }

  const car = await Car.create(req.body);
  res.status(201).json({ status: "success", data: { car } });
});

// Get All Cars (for the logged-in user)
exports.getAllCars = catchAsync(async (req, res, next) => {
  const cars = await Car.find({ user: req.user.id });
  res
    .status(200)
    .json({ status: "success", results: cars.length, data: { cars } });
});

// Get Car by ID
exports.getCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) return next(new AppError("No car found with that ID", 404));
  res.status(200).json({ status: "success", data: { car } });
});

// Update Car
exports.updateCar = catchAsync(async (req, res, next) => {
  // Check if the number of images exceeds the limit
  if (req.body.images && req.body.images.length > 10) {
    return next(new AppError("A car can have at most 10 images.", 400));
  }

  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!car) return next(new AppError("No car found with that ID", 404));
  res.status(200).json({ status: "success", data: { car } });
});

// Delete Car
exports.deleteCar = catchAsync(async (req, res, next) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  if (!car) return next(new AppError("No car found with that ID", 404));
  res.status(204).json({ status: "success", data: null });
});

// Search Cars
exports.searchCars = catchAsync(async (req, res, next) => {
  const keyword = req.query.q;
  const cars = await Car.find({
    user: req.user.id,
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { tags: { $regex: keyword, $options: "i" } },
    ],
  });
  res
    .status(200)
    .json({ status: "success", results: cars.length, data: { cars } });
});
