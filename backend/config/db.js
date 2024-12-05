const mongoose = require('mongoose');

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion réussie à MongoDB');
    } catch(err){
        console.error('Erreur de connexion à MongoDB : ', err);
        process.exit(1);
    }
}
       
module.exports = connectDatabase;
