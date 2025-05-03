const HttpError = require('../utils/httpError.util');

const products = [
  { id : 1, name: 'Laptop', price: 1000 },
  { id : 2, name: 'Smartphone', price: 2000 },
  { id : 3, name: 'Tablet', price: 3400 },
  { id : 4, name: 'TV', price: 8000 },
  { id : 5, name: 'Earphone', price: 100 },
];

const get = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      code: 200,
      data: products ?? []
    });

  } catch(e) {
    next(e);
  }
}

const getOne = (req, res, next) => {

  try {
    const id = parseInt(req.params.id, 10);
    const product = products.find(product => product.id === id);

    if (!product) {
      throw new HttpError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      code: 200,
      data: product,
    });

  } catch(e) {
    next(e);
  }
}

const create = (req, res, next) => {
  let response = {
    success : true,
    code : 200,
  }

  try {
    const { name, price } = req.body ?? {};

    if (!`${name}`.trim()) {
      throw new HttpError("name is required !", 400);
    }

    if (!price) {
      throw new HttpError("price is required!", 400);
    }

    const latestId =  products.reduce((max, product) => (product.id > max ? product.id : max),products[0].id) ?? 0;
    const product = {
      id: latestId + 1,
      name: name.trim(),
      price: parseInt(price, 10)
    };

    products.push(product);
    res.status(200).json({
      success: true,
      code: 201,
      data: product,
    });

  } catch(e) {
    next(e);
  }
}

const update = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, price } = req.body ?? {};
    
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
      throw new HttpError("Product not found!", 404);
    }

    if (`${name}`.trim() === '') {
      throw new HttpError("name cannot be empty!", 400);
    }

    products[index] = {
      ...products[index],
      name: name.trim(),
      price: parseInt(price, 10)
    };

    res.status(200).json({
      success: true,
      code: 200,
      message: "Product updated successfully",
      data: products[index],
    });

  } catch(e) {
    next(e);
  }
}

const remove = (req, res, next) => {
 try {
    const id = parseInt(req.params.id, 10);

    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new HttpError("Product not found!", 404);
    }

    const deleted = products.splice(index, 1);

    res.status(200).json({
      success: true,
      code: 200,
      message: "Product deleted successfully",
      data: deleted[0]
    });

  } catch (e) {
    next(e);
  }
}

module.exports = {
    get,
    getOne,
    create,
    update,
    remove
}