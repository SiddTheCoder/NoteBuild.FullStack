import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

//middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true ,
}))

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(cookieParser())


//import routes
import userRoutes from './routes/user.routes.js'
import collectionRoutes from './routes/collection.routes.js'
import todoRoutes from './routes/todo.routes.js'

//use routes
app.use('/api/user', userRoutes)
app.use('/api/c', collectionRoutes)
app.use('/api/t',todoRoutes)

export default app