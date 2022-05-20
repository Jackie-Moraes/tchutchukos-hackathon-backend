import { Router } from "express"
import { getVideos, getSpecificVideo, insertComment } from "../controllers/videosController.js"

const videosRouter = Router()

videosRouter.get("/videos", getVideos)
videosRouter.get("/videos/:id", getSpecificVideo)
videosRouter.post("/videos/:id", insertComment)

export default videosRouter