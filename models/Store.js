import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1, // Default level to 1
  },
  isVerified: {
    type: Boolean,
    default: false, // Default verification status to false
  },
  isOfficial: {
    type: Boolean,
    default: false,
  },
});

const Store = mongoose.model("Store", storeSchema);

export default Store;
