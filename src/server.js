require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const seedEvent = require("./utils/seed");

(async () => {
  await connectDB();
  await seedEvent();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
})();
