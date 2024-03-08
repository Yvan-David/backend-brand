import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {version} from '../package.json';
import swaggerDocs from '../src/utils/swagger';

import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

/* const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: 'REST API DOCS',
            version,
            description:
                "This is my portfolio api application documented with swagger"
        },
        servers: [
            {
                url: "http://localhost:8080/",
            },
        ],
    },
    apis: ['./router/index.ts'],
};


const spacs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(spacs)
) */

const server = http.createServer(app);

server.listen(8080, "0.0.0.0" , () => {
    console.log('Server running on http://localhost:8080/');
    swaggerDocs(app, 8080)
});

const MONGO_URL = 'mongodb+srv://irankundayvan2020:uEPkT95XDH3LakQL@cluster0.ezlvpnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
