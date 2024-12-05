const mongoose = require('mongoose');

// Définition du schema utilisateur dans la BDD
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Champ obligatoire'] },
    email: { type: String, required: [true, 'Champ obligatoire'], unique: true },
    password: { type: String, required: [true, 'Champ obligatoire'] },
});

// Exporter le scheme de l'utilisateur
const User = mongoose.model('User', userSchema);

module.exports = User;
