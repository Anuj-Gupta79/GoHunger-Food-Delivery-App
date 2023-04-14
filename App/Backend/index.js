import express from "express";
import mongodb from "./db.js";
import UserRoutes from "./Routes/CreateUser.js";

const app = express();
const PORT = 3001;
app.use(express.json());

mongodb();

app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.use("/GoHunger", UserRoutes);

app.listen(PORT, () => {
  console.log(`Port is listening on http://localhost:${PORT}`);
});
