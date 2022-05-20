import { Router } from "express"
import { getVideos, getSpecificVideo } from "../controllers/videosController.js"

const videosRouter = Router()

videosRouter.get("/videos", getVideos)
videosRouter.get("/videos/:id", getSpecificVideo)

export default videosRouter