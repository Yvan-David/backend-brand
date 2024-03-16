import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerDocs from '../src/utils/swagger';

import router from './router';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5500/signup',
    'http://127.0.0.1:5500/index.html',
    'http://127.0.0.1:5500/login/login.html'
];

// Allow requests from the specified origins
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, "0.0.0.0" , () => {
    console.log(`Server running on http://localhost:${port}/`);
    swaggerDocs(app, 3000)
});

const MONGO_URL = 'mongodb+srv://irankundayvan2020:uEPkT95XDH3LakQL@cluster0.ezlvpnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
