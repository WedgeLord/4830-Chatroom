const express = require('express');
const app = express();

// CORS
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  console.log('Middleware');
  next();
})

// API Data
app.use('/api/posts',(req,res,next)=>{
  const posts = [
    {
      id: "6546654",
      title:"1. Server Post",
      content:"This is from the server"
    }
  ];
  res.status(200).json({message:"This is fetched data",posts: posts});
})



module.exports = app
