import Product from "../model/ProductModal.js";
import Cart from "../model/cartModal.js";

export const addToCart = async (req, res) => {
  try {
    const { productId,quantity } = req.body;

    const addProduct = await Product.findById(productId);
    if (!addProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const cartItem = cart.items.find(item => item.product.equals(addProduct._id));
    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      cart.items.push({product: addProduct._id, quantity: quantity || 1}); 
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
export const removeFromCart = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await Cart.findOne();
      if (!cart || cart.items.length === 0) {
        return res.status(404).json({ message: 'Cart is empty or not found' });
      }
  
      const itemIndex = cart.items.findIndex(item => item.product.equals(id));
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      
      cart.items.splice(itemIndex, 1);
  
      
      await cart.save();
      res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ message: 'Server error while removing product from cart' });
    }
  };
  export const updateCartItem = async (req, res) => {
    const { itemId } = req.params; 
    const { quantity } = req.body;

    try {
       
        const cart = await Cart.findOneAndUpdate  (itemId); 

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

       
        cart.items[itemIndex].quantity = quantity;

       
        await cart.save();

      
        return res.status(200).json({ cartItem: cart.items[itemIndex] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};