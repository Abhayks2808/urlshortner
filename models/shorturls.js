const mongoose=require('mongoose');
const ShortId=require('shortid');

const shortUrlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:ShortId.generate
    },
    clicks:{
        type:Number,
        reuired:true,
        default:0
    }
})
module.exports=mongoose.model('shortUrl',shortUrlSchema)