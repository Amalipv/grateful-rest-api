import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import entriesRouter from "./routes/entries.js";
import cors from 'cors';

const app = express();
const PORT = 8086;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.DB_URL).
then(console.log("Connected to the DB."))
.catch((err) => console.log(err));

app.use(cors({origin: '*'}));

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/entries", entriesRouter);

app.get("/", (req, res) => {
  console.log("Get request for /");
  res.send("Hello, This is your server, Please send your requests. ;)");
})

app.listen(PORT, () => console.log(`Server running on Port http://localhost:${PORT}`));;