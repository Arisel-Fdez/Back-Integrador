import { Request, Response } from "express";
import { LikeUseCase } from "../../application/likeUseCase";

export class LikeController {
    constructor(readonly likeUseCase: LikeUseCase) {}

    async addLike(req: Request, res: Response) {
        try {
            const { publicationId, userId } = req.body;
            const result = await this.likeUseCase.addLike(publicationId, userId);

            if (result) {
                return res.status(201).send({ status: "success", message: "Like added successfully." });
            } else {
                return res.status(500).send({ status: "error", message: "Internal server error." });
            }
        } catch (error) {
            console.error("Error in LikeController:", error);
            return res.status(500).send({ status: "error", message: "Internal server error." });
        }
    }

    async removeLike(req: Request, res: Response) {
        try {
            const { publicationId, userId } = req.body;
            const result = await this.likeUseCase.removeLike(publicationId, userId);

            if (result) {
                return res.status(200).send({ status: "success", message: "Like removed successfully." });
            } else {
                return res.status(500).send({ status: "error", message: "Internal server error." });
            }
        } catch (error) {
            console.error("Error in LikeController:", error);
            return res.status(500).send({ status: "error", message: "Internal server error." });
        }
    }

    async countLikesByPublication(req: Request, res: Response) {
        try {
            const { publicationId } = req.params;
            const count = await this.likeUseCase.countLikesByPublication(publicationId);
            return res.status(200).send({ status: "success", data: { count } });
        } catch (error) {
            console.error("Error in LikeController:", error);
            return res.status(500).send({ status: "error", message: "Internal server error." });
        }
    }

    
}
