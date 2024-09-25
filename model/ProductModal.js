import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: mongoose.Types.Decimal128, default: 0 },
    count: { type: Number, default: 0 }
  },
  availability: { type: Number },
});

const Product = mongoose.model("Products",productSchema)
export default Product
