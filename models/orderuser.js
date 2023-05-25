const mongoose  =  require('mongoose');


const customerSchema = new mongoose.Schema({
    customer_id:{
        type:Number
    },
    customer_name:{
        type:String
    },
    email:{
        type:String
    },
    city:{
        type:String
    },
    price:{
        type:Number
    },
    country:{
        type:String
    }
})


const CustModel = new mongoose.model('customer',customerSchema)
module.exports = CustModel;