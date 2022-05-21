import db from "../db.js"
import { ObjectId } from "mongodb"
import Joi from "joi"
import dayjs from "dayjs"

export async function getVideos(req,res){
    const category = req.query.category
    const order = req.query.order
    const limit = parseInt(req.query.limit)
    const orderRegex = new RegExp("(\\w*):(\\w*)")
    const orderKey = order?.match(orderRegex)[2]
    const orderValue = order?.match(orderRegex)[1]
    const sortDirection = (() => {
        if (orderValue === "desc") return -1
        else if (orderValue === "asc") return 1
    })()
    const options = {
        ...(limit && { limit: limit }),
        ...(order && { sort: { [orderKey]: sortDirection } })
    }
    const query = {
        ...(category && {categories: category}),
    }
    try{
        const videos = await db.collection("videos").find(query, options).toArray()
        if(videos.length === 0) return res.status(404).send("No videos found")
        res.status(200).send(videos)

    }catch(e){
        res.status(500).send("Connection with database has failed")
    }
    }

export async function getSpecificVideo(req, res){
    const {id} = req.params
    try{
        const specificVideo = await db.collection("videos").findOne({_id: new ObjectId(id)})
        if(specificVideo){
            res.status(200).send(specificVideo)
        }
        else{
            res.status(404).send("Video not found")
        }
    }catch(e){
        res.status(500).send("Connection with database has failed")
    }
}

export async function insertComment(req, res){
    const {name, comment} = req.body
    const {id} = req.params
    const commentSchema = Joi.object({
        name: Joi.string().required(),
        comment: Joi.string().required()
    })
    const validation = commentSchema.validate(req.body)
    try{
        const insertComment = await db.collection("videos").updateOne({_id: new ObjectId(id)}, {$push: {comments:{name: name, comment: comment} }})
        res.status(201).send("comment created")
    }catch(e){
        res.status(500).send("Connection with database has failed")
    }
}

export async function likeVideo(req, res){
    const {id} = req.params
    try{
        await db.collection("videos").updateOne({_id: new ObjectId(id)}, {$inc: {likes: + 1}})
        res.status(200).send("Liked")
    }catch(e){
        console.log(e)
        res.status(500).send("Connection with database has failed")
    }
}

export async function dislikeVideo(req, res){
    const {id} = req.params
    try{
        await db.collection("videos").updateOne({_id: new ObjectId(id)}, {$inc: {dislikes: +1}})
        res.status(200).send("Disliked")
    }catch(e){
        console.log(e)
        res.status(500).send("Connection with database has failed")
    }
}