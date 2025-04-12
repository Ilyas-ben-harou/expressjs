// models/Product.js - Modèle Mongoose pour les produits

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du produit est requis'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La description du produit est requise'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Le prix du produit est requis'],
        min: [0, 'Le prix ne peut pas être négatif']
    },
    category: {
        type: String,
        required: [true, 'La catégorie du produit est requise'],
        trim: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);