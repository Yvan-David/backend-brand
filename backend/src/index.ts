import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import swaggerDocs from '../src/utils/swagger';
import multer from 'multer';


import router from './router';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const MONGO_URL = 'mongodb+srv://irankundayvan2020:uEPkT95XDH3LakQL@cluster0.ezlvpnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const allowedOrigins = [
    'https://backend-brand-production.up.railway.app/',
    'https://bejewelled-meerkat-d424f8.netlify.app/',
    'https://bejewelled-meerkat-d424f8.netlify.app',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5500/signup',
    'http://127.0.0.1:5500/index.html',
    'http://127.0.0.1:5500/login/login.html',
    'http://127.0.0.1:5500/blogs/editor.html',
    'http://127.0.0.1:5500/blogs/blog.html',
    'http://127.0.0.1:5500/blogs/65e933cb788c66d93e726251/comment/65f79ca82849bf24d1f419bf',
    'http://127.0.0.1:5500/blogs/65e933cb788c66d93e726251/comment/65f79ca82849bf24d1f419bf/',
    'http://127.0.0.1:5500/dashboard/dashboard.html'
   // 'http://127.0.0.1:5500/login/login.html'
    
];

// Allow requests from the specified origins
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(session({
       secret: 'SECRET KEY',
       resave: false,
       saveUninitialized: true,
       cookie: { secure: false },
       store:MongoStore.create({mongoUrl:MONGO_URL})
    }));
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, "0.0.0.0" , () => {
    console.log(`Server running on http://localhost:${port}/`);
    swaggerDocs(app, 3000)
});



mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
