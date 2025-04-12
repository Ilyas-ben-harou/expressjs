// routes/productRoutes.js - Définition des routes pour les produits

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET un produit par ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST créer un nouveau produit
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        inStock: req.body.inStock
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT mettre à jour un produit
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        if (req.body.name) product.name = req.body.name;
        if (req.body.description) product.description = req.body.description;
        if (req.body.price !== undefined) product.price = req.body.price;
        if (req.body.category) product.category = req.body.category;
        if (req.body.inStock !== undefined) product.inStock = req.body.inStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE supprimer un produit
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;