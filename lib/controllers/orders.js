const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert(req.body);

    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const order = await Order.getById(req.params.id);

    res.json(order);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();

    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.updateById(id, req.body);

      if (!order) {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const order = await Order.deleteById(req.params.id);

    res.json(order);
  });
