require('dotenv').config()
const { MongoClient } = require("mongodb")
const Express = require("express")
const Cors = require("cors")
const e = require("express")

const client = new MongoClient(`MONGODB_URI`)
const server = Express()

server.use(Express.json())
server.use(Express.urlencoded({extended: true }))
server.use(Cors())

let collection
server.get("/search", async (req, res) => {
  try {
    let result = await collection.aggregate([
      {
        "$search": {
          "autocomplete": {
            "query": `${req.query.sku}`,
            "path": "sku",
            "fuzzy": {
              "maxEdits": 2
          }
        }
      }
    }
      ]).toArray();
      console.log(result)
    res.send(result)
  } catch (err) {
    res.status(500).send({ message: e.message })
  }
})

server.listen("3000", async () => {
    try{
      await client.connect()
      collection = client.db("graphql-testdb1").collection("skus")
     
    
    } catch (err) {
      console.log(err)
    }
} )



