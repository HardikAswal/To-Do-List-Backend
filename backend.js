const express = require ('express');
const bodyParser = require ('body-parser');
const server = express();
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser:true});

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(express.static('public'));

const ListSchema = new Schema({
    title:String,
    status: Boolean,
    pinned:Boolean,
    anim: Boolean
})

const Task = mongoose.model('Task',ListSchema);

server.get("/task",function(req,res){
    Task.find({}).then((doc)=>{
        console.log(doc)
        res.json(doc)
    })
}) 

server.post("/task",function(req,res){
    let task = new Task();
    task.title=req.body.title;
    task.status=req.body.status;
    task.pinned=req.body.pinned;
    task.anim=req.body.anim;
    task.save();
    res.json(task);
    console.log(task);
    
})

server.put("/task/:id",function(req,res){
    console.log(req.body,req.params.id);
    Task.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).then((doc)=>{
        console.log(doc)
        res.json(doc)
    })
})


server.delete("/task/:id",function(req,res){
    console.log(req.params.id)
    Task.findOneAndDelete({_id:req.params.id}).then((doc)=>{
        console.log(doc)
        res.json(doc)
    })
})

server.listen(8080,function(req,res){
    console.log("Server Started.");
})