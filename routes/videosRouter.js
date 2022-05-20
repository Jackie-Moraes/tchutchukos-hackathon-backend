import { Router } from "express"
import { getVideos } from "../controllers/videosController.js"

const videosRouter = Router()

videosRouter.get("/videos", getVideos)

export default videosRouter