import { UserPublication } from "./userPublication";

export interface UserPublicationRepository {
    addPublication(userId: number, description: string, multimedia: string): Promise<UserPublication | null>;
    getAllPublications(): Promise<UserPublication[]>;
    deletePublicationById(publicationId: string): Promise<void>;
    getPublicationsByUserId(userId: number): Promise<UserPublication[]>;

    getAudioPublications(): Promise<UserPublication[]>;
    getGifsPublications(): Promise<UserPublication[]>;
    getImagesPublications(): Promise<UserPublication[]>;
    getPDFPublications(): Promise<UserPublication[]>;
    getVideosPublications(): Promise<UserPublication[]>;
    

}
