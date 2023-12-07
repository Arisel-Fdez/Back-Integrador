import express from 'express';
import { Signale } from 'signale';
import cors from 'cors';
import * as admin from 'firebase-admin';
import morgan from 'morgan';
import { initializeDatabase } from './database/sequelize';
import { accountRouter } from './personalFinances/account/infraestructure/accountRouter'
import { transactionRouter } from './personalFinances/transaction/infraestructure/transactionRouter'
//importaciones servicios de eventos
import { createTransactionServices } from './personalFinances/transaction/infraestructure/dependencies';
import { createAccountServices } from './personalFinances/account/infraestructure/dependencies';

const app = express();
app.use(cors());

const signale = new Signale();
app.use(morgan('dev'));
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/", accountRouter);
app.use("/", transactionRouter);

async function startServer() {
    try {
        // Luego inicializa y conecta la base de datos
        await initializeDatabase();

        //Inicializacion de los suscriptores para recibir eventos, si se cambia la estructura de carpetas, revisar imporataciones
        await createTransactionServices();
        await createAccountServices();
        // Después inicia el servidor Express
        app.listen(PORT,() => {
            signale.success(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor:", error);
    }
}

startServer();