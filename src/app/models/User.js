import bcrypt from 'bcrypt';

const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema({
  email: { 
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
  },

  confPassword:{
    type: String,
    validate:{
      validator: function(val){
        return val === this.password;
      }
    },
  },
  
  fullName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
    validate:{
      validator: function(val){
        // checks if the phone number has 10 numeric digits
        return /^\d{10}$/.test(val);
      },
    },
    required: true,
    unique: true,
  }
}, { timestamps: true });

// after the validation is done
UserSchema.post('validate', (user) => {
  const pass = user.password;

  // from the documentation of bcrypt
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(pass, salt);
  user.confPassword = undefined;
})

export const User = models?.User || model('User', UserSchema);
