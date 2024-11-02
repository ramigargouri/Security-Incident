const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/users/all", UserController.getAllPeople);
  app.get("/api/user/:id", UserController.getUserById);
  app.get("/api/users/:email", UserController.getUserByEmail);
  app.put("/api/user/:id", UserController.updateUser);
  app.delete("/api/user/delete/:id", UserController.deleteUser);
};
