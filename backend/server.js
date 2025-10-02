import app from "./app.js";
import dotenv from "dotenv";
import {connectMongoDatabase} from './config/db.js'
dotenv.config({ path: "backend/config/config.env" });

connectMongoDatabase()
const port = process.env.PORT || 3000;
// console.log(app);


// Passing functions


// app.get("/api/v1/product", func1Single);

// route



app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${port}`);
});
