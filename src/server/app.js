import express from 'express';
import helmet from 'helmet';
import path from 'path';

import render from './render';


const app = express();


// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());


// Static content
const publicPath = __TEST__ ? '../../public' : '../public';
app.use('/', express.static(path.resolve(__dirname, publicPath)));


// Simple /ping route - can be used by load balancers or deployment systems
// to verify if the server is up and running.
app.get('/ping', (req, res) => res.status(200).end());


// Dynamic content
app.get('/', (req, res) => {
    const markup = render();
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<!DOCTYPE html>');
    res.write(markup);
    res.end();
});


export default app;
