import db from "../db.js"

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
