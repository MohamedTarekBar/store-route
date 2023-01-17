const Product = require('../Model/products.model');
const model = new Product()

const createProduct = async (req, res, next) => {
    try {
        const product = await model.create(res.locals.product);
        return res.json({
          status: 200,
          message: 'product added successfully',
          data: product,
        });
      } catch (error) {
        next(error);
      }
};

const updateProduct = async (req,res,next) => {
  try {
    const product = await model.update(res.locals.product);
    return res.json({
      status: 200,
      message: 'product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req,res,next) => {
  try {
    const product = await model.delete(res.locals.ids);
    return res.json({
      status: 200,
      message: 'product deleted successfully',
      data: product,
    });
  } catch (error) {
    next(error)
  }
}

const indexProducts = async (req,res,next) => {
  try {
    const products = await model.index();
    return res.json({
      status: 200,
      message: 'retrive products successfully',
      data: products,
    });
  } catch (error) {
    next(error)
  }
}

const filterProductByPrice = async (req,res,next) => {
  try {
    const products = await model.filterByPrice(res.locals.price);
    return res.json({
      status: 200,
      message: 'retrive products successfully',
      data: products,
    });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  indexProducts,
  filterProductByPrice
};
