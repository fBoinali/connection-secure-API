const User = require('../models/User'); // Import du modele utilisateur
const hashPwd = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async(req, res) => {
    try {
        const{ name, email, password } =req.body;

        // Vérifie si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        // Hacher le mot de passe
        const salt = await hashPwd.genSalt(10);
        const hashedPassword = await hashPwd.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

exports.login = async(req, res) => {
    try {
        const{  email, password } =req.body;

        //Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "Identifiant incorrect"});
        }

        //Comparer le mot de passe en entré avec celui dans la BDD
        const isMatch = await hashPwd.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Identifiant incorrect"}); 
        }

        //Créer le token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

exports.getUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password -_id -__v"); // Exclure les mots de passe, ids, version
        res.json(users);
    } catch (err){
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};