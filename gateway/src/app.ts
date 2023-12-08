import express, {Application} from 'express';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

import dotenv from 'dotenv';
import { Signale } from "signale";

const app:Application = express();
const signale = new Signale();

app.use(morgan('dev'));

dotenv.config();
const PORT = process.env.PORT || 3000;


//Producion
//
/* 
app.use('/api/v1/login', proxy('http://gateway-1-env.eba-bm387mch.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/accout', proxy('http://gateway-1-env.eba-bm387mch.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/transaction', proxy('http://gateway-1-env.eba-bm387mch.us-east-1.elasticbeanstalk.com'));
//server 2
app.use('/api/v1/user',proxy('http://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/login',proxy('http://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/publication',proxy('http://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/reaction',proxy('http://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/comment',proxy('http://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com'));
app.use('/api/v1/gps',proxy('http://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com'));
*/

//Local
//server1
app.use('/api/v1/accout', proxy('http://localhost:3001'));
app.use('/api/v1/transaction', proxy('http://localhost:3001'));
//server 2
app.use('/api/v1/user',proxy('http://localhost:3002'));
app.use('/api/v1/login',proxy('http://localhost:3002'));
app.use('/api/v1/publication',proxy('http://localhost:3002'));
app.use('/api/v1/reaction',proxy('http://localhost:3002'));
app.use('/api/v1/comment',proxy('http://localhost:3002'));
app.use('/api/v1/gps',proxy('http://localhost:3002'));

app.listen(PORT,() => {
    signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});