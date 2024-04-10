const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const usersSchema = new Schema({
    name: { type: String },
    email: { type: String },
    website: { type: String },
    entryDate: { type: Date, default: Date.now }
});

const contactSchema = new Schema({
    email: { type: String, required: true },
    website: { type: String, required: true },
    message: { type: String, required: true },
    entryDate: { type: Date, default: Date.now }
});


const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    participants: [{ type: String }] 
  });

  const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema, 'user');
const Users = mongoose.model('Users', usersSchema, 'users');
const Contact = mongoose.model('Contact', contactSchema, 'contact_form');

module.exports = { User, Users, Contact, Event };
