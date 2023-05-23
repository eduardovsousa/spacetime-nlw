import 'dotenv/config';

import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import staticModel from '@fastify/static';
import { memoriesRoute } from './routes/memories';
import { authRoutes } from './routes/auth';
import { uploadRoutes } from './routes/upload';
import { resolve } from 'node:path';

const app = fastify();

app.register(multipart);

app.register(staticModel), {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads'
};

app.register(cors, {
    origin: ['http://localhost:3000'],
});

app.register(jwt, {
    secret: 'spacetime',
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoute);

app
    .listen({
        port: 3333,
        host: '0.0.0.0',
    })
    .then(() => {
        console.log('🚀 HTTP server running on http://localhost:3333');
    });
