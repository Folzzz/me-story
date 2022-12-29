import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// CUSTOM
import connectDB from './config/db.js';
import postsRoute from './routes/postsRoute.js';
import usersRoute from './routes/usersRoute.js';

// LOAD CONFIG
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;

// CONNECT DATABASE
connectDB();

// MIDDLEWARE

// FORMDATA AND JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// ROUTES
app.use('/journey', postsRoute);
app.use('/users', usersRoute);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));