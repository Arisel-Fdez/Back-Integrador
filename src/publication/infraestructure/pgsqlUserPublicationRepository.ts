import UserModel from "../../user/infraestructure/models/userModel";
import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";
import UserPublicationModel from "./models/userPublicationModel";


export class PgsqlUserPublicationRepository implements UserPublicationRepository {
    
    async addPublication(userId: number, description: string, multimedia: string): Promise<UserPublication | null> {
        try {
            // Buscar el usuario para obtener su nombre
            const user = await UserModel.findByPk(userId);
            if (!user) throw new Error('Usuario no encontrado.');
    
            // Usando Sequelize para crear una nueva publicación
            const createdPublication = await UserPublicationModel.create({
                userId,
                description,
                multimedia,
                // Aquí puedes agregar otros campos si son necesarios
            });
            
            // Aquí deberías retornar también el nombre del usuario si es necesario
            return new UserPublication(createdPublication.id, user.name, createdPublication.description, createdPublication.multimedia);
        } catch (error) {
            console.error("Error in PgsqlUserPublicationRepository:", error);
            return null;
        }
    }

    async getAllPublications(): Promise<UserPublication[]> {
        try {
            // Aquí incluimos el modelo del usuario y especificamos los atributos que queremos
            const publications = await UserPublicationModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name'], // Asegúrate de que estos nombres coincidan con los de tu modelo de usuario
                }]
            });

            // Mapeamos el resultado para incluir el nombre y apellido del usuario
            return publications.map(pub => {
                // Convertimos el userId a string si es necesario, para coincidir con la definición de tu clase UserPublication
                const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                return new UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
            });
        } catch (error) {
            console.error("Error al obtener todas las publicaciones:", error);
            return [];
        }
    }


    async getPublicationsByUserId(userId: number): Promise<UserPublication[]> {
        try {
            const publications = await UserPublicationModel.findAll({
                where: { userId },
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name', 'profilePicture'],
                }]
            });

            return publications.map(pub => new UserPublication(
                pub.id, 
                pub.userId.toString(), 
                pub.description, 
                pub.multimedia, 
                pub.user.profilePicture, 
                `${pub.user.name} ${pub.user.last_name}`
            ));
        } catch (error) {
            console.error("Error en PgsqlUserPublicationRepository:", error);
            return [];
        }
    }

    async getAudioPublications(): Promise<UserPublication[]> {
        try {
            const publications = await UserPublicationModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name'],
                }]
            });
    
            // Definimos las extensiones de audio válidas
            const audioExtensions = ['.mp3', '.wav', '.aac'];
    
            // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en extensiones de audio
            const audioPublications = publications.filter(pub =>
                audioExtensions.some(ext => 
                    pub.multimedia && pub.multimedia.includes(ext + '?alt=media')
                )
            );
    
            // Mapeamos el resultado para incluir el nombre completo del usuario
            return audioPublications.map(pub => {
                const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                return new UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
            });
        } catch (error) {
            console.error("Error al obtener publicaciones de audio:", error);
            return [];
        }
    }


    async getGifsPublications(): Promise<UserPublication[]> {
        try {
            const publications = await UserPublicationModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name'],
                }]
            });
    
            // Definimos la extensión de GIF válida
            const gifExtension = '.gif';
    
            // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en la extensión de GIF
            const gifPublications = publications.filter(pub =>
                pub.multimedia && pub.multimedia.includes(gifExtension + '?alt=media')
            );
    
            // Mapeamos el resultado para incluir el nombre completo del usuario
            return gifPublications.map(pub => {
                const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                return new UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
            });
        } catch (error) {
            console.error("Error al obtener publicaciones de GIFs:", error);
            return [];
        }
    }
    
    async getImagesPublications(): Promise<UserPublication[]> {
        try {
            const publications = await UserPublicationModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name'],
                }]
            });
    
            // Definimos las extensiones de imagen válidas
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.bmp'];
    
            // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en extensiones de imagen
            const imagePublications = publications.filter(pub =>
                imageExtensions.some(ext => 
                    pub.multimedia && pub.multimedia.includes(ext + '?alt=media')
                )
            );
    
            // Mapeamos el resultado para incluir el nombre completo del usuario
            return imagePublications.map(pub => {
                const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                return new UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
            });
        } catch (error) {
            console.error("Error al obtener publicaciones de imágenes:", error);
            return [];
        }
    }
    
    async getPDFPublications(): Promise<UserPublication[]> {
        try {
            const publications = await UserPublicationModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name'],
                }]
            });
    
            // Definimos la extensión de archivo PDF válida
            const pdfExtension = '.pdf';
    
            // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en la extensión PDF
            const pdfPublications = publications.filter(pub =>
                pub.multimedia && pub.multimedia.includes(pdfExtension + '?alt=media')
            );
    
            // Mapeamos el resultado para incluir el nombre completo del usuario
            return pdfPublications.map(pub => {
                const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                return new UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
            });
        } catch (error) {
            console.error("Error al obtener publicaciones de PDF:", error);
            return [];
        }
    }
    
    async getVideosPublications(): Promise<UserPublication[]> {
        try {
            const publications = await UserPublicationModel.findAll({
                include: [{
                    model: UserModel,
                    attributes: ['name', 'last_name'],
                }]
            });
    
            // Definimos las extensiones de archivo de video válidas
            const videoExtensions = ['.mp4', '.mov', '.wmv', '.avi'];
    
            // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en extensiones de video
            const videoPublications = publications.filter(pub =>
                videoExtensions.some(ext => 
                    pub.multimedia && pub.multimedia.includes(ext + '?alt=media')
                )
            );
    
            // Mapeamos el resultado para incluir el nombre completo del usuario
            return videoPublications.map(pub => {
                const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                return new UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
            });
        } catch (error) {
            console.error("Error al obtener publicaciones de video:", error);
            return [];
        }
    }
    
    
    

    async deletePublicationById(publicationId: string): Promise<void> {
        try {
            await UserPublicationModel.destroy({
                where: {
                    id: publicationId
                }
            });
        } catch (error) {
            console.error("Error al eliminar la publicación:", error);
            throw error;
        }
    }

}
