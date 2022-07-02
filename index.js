const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
// pw: 9fYXJTouapDtgZzd
// user: todolist
const uri = "mongodb+srv://todolist:9fYXJTouapDtgZzd@cluster0.jeq1a.mongodb.net/?retryWrites=true&w=majority";
console.log("zilani");
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,

});
async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("Todolist").collection("tasklist");
    app.get("/task", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      console.log(result);
    });
    app.post("/task",async(req,res)=>{
      const task=req.body;
      console.log(task)
      
     const result=await taskCollection.insertOne(task)
     console.log(result)
     res.send(result)
    })
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })