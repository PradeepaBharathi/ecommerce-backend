import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    items: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
          quantity: { type: Number, required: true },
        },
      ],
});



const Cart = mongoose.model("Cart", cartItemSchema);
export default Cart