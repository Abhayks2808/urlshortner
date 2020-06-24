const express=require('express');
const app=express();
const mongoose=require('mongoose');
const shortUrl=require('./models/shorturls')
const dotenv=require('dotenv');
const port=process.env.PORT || 5000;
dotenv.config()
//configure ejs setup
app.set('view engine','ejs')
//mongoose setup
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/urlshotner',{useNewUrlParser:true,useUnifiedTopology:true})
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res) =>{
     let shorturls=await shortUrl.find()
    res.render('index',{shorturls:shorturls})
})
app.post('/shorturls',async(req,res)=>{
await shortUrl.create({full:req.body.fullUrl})
res.redirect("/")
})
app.get('/:shorturl',async(req,res)=>{
    let Urlshort=await shortUrl.findOne({short:req.params.shorturl})
    
        if(Urlshort==null) return res.sendStatus(404)
        Urlshort.clicks++;
        Urlshort.save()
        res.redirect(Urlshort.full)
})
app.listen(port,(req,res) =>{
    console.log(`server started on ${port} `)
})
