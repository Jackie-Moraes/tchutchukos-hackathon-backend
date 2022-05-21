import db from "../db.js"

export async function getCategories(req,res){
    try{
        const categories = await db.collection("categories").find({}).toArray()
        res.status(200).send(categories)
    }catch(e){
        res.status(500).send("Connection with database has failed")
    }
}