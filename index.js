const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
const ObjectId = require("mongodb").ObjectId;
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
    const taskComplete = client.db("Todolist").collection("completedtask");
    app.get("/task", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      console.log(result);
    });
    // task adding
    app.post("/task",async(req,res)=>{
      const task=req.body;
      console.log(task)
      
     const result=await taskCollection.insertOne(task)
     console.log(result)
     res.send(result)
    })
    // complete task adding
    app.post("/completetask",async(req,res)=>{
      const task=req.body;
      console.log(task)
      
     const result=await taskComplete.insertOne(task)
     console.log(result)
     res.send(result)
    })
    app.put("/taskupdate/:id",async(req,res)=>{
      const id=req.params.id;
      const task=req.body.task;
      console.log(task)
      const filter={_id:ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          task:task,
        },
      };
      
      
     const result=await taskCollection.updateOne(filter, updateDoc, options);
     console.log(result)
     res.json(result)
    })
    // completed task dlt from task list
    app.delete("/dlt/:id",async(req,res)=>{
      const id=req.params.id;
      console.log(id);
          const filter={_id:ObjectId(id)};
          const result= await taskCollection.deleteOne(filter);
      res.send(result);
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