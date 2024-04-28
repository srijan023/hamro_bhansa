import bcrypt from 'bcrypt';

const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {
    type: String, 
    required: true, 
    validate: (pass)=>{
      if(!pass?.length || pass?.length < 5){
        new Error("Password must be at least 5 characters long")
        return false;
      }
    },
  }
},{timestamps: true});

// after the validation is done
UserSchema.post('validate', (user)=>{
  const pass = user.password;

  // from the documentation of bcrypt
  const salt = bcrypt.genSaltSync(10);
  user.password =  bcrypt.hashSync(pass, salt);
})

export const User = models?.User || model('User', UserSchema);
