const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./models/contact');

dotenv.config();

const contacts = [ 
    { name: "Dick", lastName: "Moreni", email: "mbada99@gmail.com",  favoriteColor: "white", birthday: "1999-01-01" },
    { name: "Jane", lastName: "Phiri", email: "janephiri@gmail.com", favoriteColor: "greeen", birthday: "1990-06-08"},
    { name: "Lewis", lastName: "kabunyu", email: "kabunyulewis@gmail.com", favoriteColor: "blue", birthday: "1999-01-08"},
    { name: "Tadiwa", lastName: "Chirema", email: "Chirematadiwa@gmail.com", favoriteColor: "gray", birthday: "2000-02-09"},
    { name: "Clifford", lastName: "Musungo", email: "Cliffmusungo@gmail.com", favoriteColor: "black", birthday: "1998-06-08"}
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Contact.deleteMany(); // Clear existing data
        await Contact.insertMany(contacts); // Insert new data
        console.log('Data Imported');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error importing data:', error);
    }
};

importData();