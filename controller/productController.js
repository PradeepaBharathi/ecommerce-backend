import Product from '../model/ProductModal.js'; 

export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find(); 

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No Products found" });
    }

    res.status(200).json({ productList: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};


export const fetchProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const product = await Product.findById(id); 

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};


export const fetchProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category)
    const products = await Product.find({ category }); 

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};


export const fetchUniqueCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category'); 

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};


export const addProduct = async (req, res) => {
  const { title, description, price,category, image, rating, availability } = req.body;

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image,
      rating,
      availability,
    });

    await newProduct.save(); 
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};
