// index.js - Fichier principal de l'application

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connexion à MongoDB établie avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API de gestion de produits' });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});