import {Express, Request, Response} from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {version} from '../../package.json';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: 'MyBrand REST API DOCS',
            version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/router/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number){
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("docs.json", (req:Request, res: Response) => {
        res.setHeader("content-type", "application/json");
        res.send(swaggerSpec);
    })
}

export default swaggerDocs;
