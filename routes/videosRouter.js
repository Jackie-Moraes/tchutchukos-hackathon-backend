import { Router } from "express"
import { getVideos, getSpecificVideo, insertComment, likeVideo, dislikeVideo } from "../controllers/videosController.js"

const videosRouter = Router()

videosRouter.get("/videos", getVideos)
videosRouter.get("/videos/:id", getSpecificVideo)
videosRouter.post("/videos/:id", insertComment)
videosRouter.post("/videos/:id/like", likeVideo)
videosRouter.post("/videos/:id/dislike", dislikeVideo)

export default videosRouter