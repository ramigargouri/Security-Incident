const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "prenom est obligatoire"],
    },
    lastname: {
      type: String,
      required: [true, "nom est obligatoire"],
    },
    email: {
      type: String,
      required: [true, "email est obligatoire"],
    },
    phone: {
      type: Number,
      required: [true, "n° de telephone est obligatoire"],
    },
    password: {
      type: String,
      required: [true, "mot de passe is required"],
    },
  },
  { timestamps: true }
);

//creating the virtual field for confirm password
UserSchema.virtual("confirm")
  .get(() => this.confirm)
  .set((value) => (this.confirm = value));

//use the virtual field for confirm password to make sure it matches up with password-->
//we are adding a validation for the confirm password virtual field
UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirm) {
    this.invalidate("confirm", "Password must match confirm password");
  }
  next();
});

//before saving the user to the db, we will hash their password using bcrypt
UserSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      console.log("hashing failed tho! now what! 20 minute rule?", err);
      next();
    });
});

UserSchema.pre("updateOne", { document: false, query: true }, function (next) {
  bcrypt
    .hash(this.options.password, 10)
    .then((hash) => {
      this._update.password = hash;
      next();
    })
    .catch((err) => {
      console.log("erreur update", err);
    });
});

module.exports = mongoose.model("User", UserSchema);
