import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import usersRouter from './routes/usersRoutes.js';
import movieRouter from './routes/movieRoutes.js';
import listRouter from './routes/listRoutes.js';

const app = express();


dotenv.config(); //import config.env file

mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("mongodb is connected")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', movieRouter)
app.use('/api/lists', listRouter)


const port = process.env.PORT || 8800;
app.listen(port, () => {
    console.log(`Serve at: http://localhost:${port}`);
});
