import express from "express";
import helloRoutes from "../Src/Routes/UserRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api", helloRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
