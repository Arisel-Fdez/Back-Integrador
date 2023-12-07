import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Signale } from 'signale';
import { initializeDatabase } from './database/sequelize'; 
import { userRouter } from './user/infraestructure/userRouter';
import { authRouter } from './auth/infraestructure/authRouter';
import * as admin from 'firebase-admin';
import serviceAccount from './user/infraestructure/backsocialmovil-firebase.json';
import { userPublicationRouter } from './publication/infraestructure/userPublicationRouter';
import { likeRouter } from './reaction/infraestructure/likeRouter';
import { commentRouter } from './comment/infraestructure/commentRouter';
import { coordinateRouter } from './location/infraestructure/coordinateRouter';

const app = express();
app.use(cors());
const signale = new Signale();
app.use(morgan('dev'));
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use('/',userRouter);
app.use("/",authRouter);
app.use('/',userPublicationRouter);
app.use('/',likeRouter)
app.use('/',commentRouter)
app.use('/',coordinateRouter)

async function startServer() {
    try {
        // Inicializa Firebase Admin
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
            storageBucket: 'backsocialmovil.appspot.com'
        });          
        signale.success("Firebase Admin initialized successfully");

        // Luego inicializa y conecta la base de datos
        await initializeDatabase();

        
        // Después inicia el servidor Express
        app.listen(PORT,() => {
            signale.success(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor:", error);
    }
}

// Inicia todo
startServer();