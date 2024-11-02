require("dotenv").config();
var express = require("express");
const cors = require("cors");
var cookies = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

require("./config/mongoose.config");

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
// require("./routes/profil.routes")(app);
// require("./routes/pdf.routes")(app);

app.listen(process.env.PORT, () => {
  console.log("listening on port 8000");
});
