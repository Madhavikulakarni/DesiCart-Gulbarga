import app from "./app.js";
import dotenv from "dotenv";
import {connectMongoDatabase} from './config/db.js'
dotenv.config({ path: "backend/config/config.env" });

connectMongoDatabase()
// handle uncaught exception errors
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`)
  console.log(`Server is shutting down, due to unhandled promise rejection`)
  process.exit(1)
})
// console.log(myName) // var not defined
const port = process.env.PORT || 3000;
// console.log(app);


// Passing functions

// app.get("/api/v1/product", func1Single);

// route

const server=app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${port}`);
});


// promise rejection error handling
process.on('unhandledRejection',(err)=>{
  console.log(`Error: ${err.message}`)
  console.log(`Server is shutting down, due to unhandled promise rejection`)
  server.close(()=>{
    process.exit(1)
  })
})
