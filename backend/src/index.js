import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env',
})

await connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Running at Port http://localhost:${process.env.PORT}`)
    })
   })
  .catch((err) => {
  console.log('Error Occured at main Index', err)
})