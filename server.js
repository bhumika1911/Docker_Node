const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes=require("./src/student/routes");
const app= express();   
const port= 7000;
const path=require('path');

app.use(express.json());    
app.use(bodyParser.json());
app.get("/",async(req,res)=>{
    res.sendFile(path.join(__dirname , 'index.html'));
})

// app.get("/", (req,res)=>{
//     res.send("hello world");
// });

app.use("/api/v1/students", studentRoutes);
app.listen(port,() => console.log(`app listening on port ${port}`));

