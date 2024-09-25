import Product from "../model/ProductModal.js";
import Cart from "../model/cartModal.js";

export const addToCart = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    const addProduct = await Product.findById(id);
    if (!addProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const cartItem = cart.items.find(item => item.product.equals(addProduct._id));
    if (cartItem) {
      cartItem.quantity += quantity; 
    } else {
      cart.items.push({ product: addProduct._id, quantity }); 
    }

    
    await cart.save();
    res.json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while adding to cart' });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: 'Cart is empty', cart: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
};
