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
import authVerify from './routes/auth.routes.js'

//use routes
app.use('/api/user', userRoutes)
app.use('/api/c', collectionRoutes)
app.use('/api/t', todoRoutes)

app.use('/api/auth', authVerify)


// //secured-routing endpoints for frontend
// app.get('/api/auth/verify', verifyJWT, (req, res) => {
//   // If the user reaches here, their token is valid
//   res.status(200).send('Authenticated');
// });

export default app