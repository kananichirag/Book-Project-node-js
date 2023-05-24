const BookServices = require('../services/bookservices');
const { response } = require('../middleware/response');
const bodyParser = require('body-parser');
const bookservices = require('../services/bookservices');

const GetAll = async (req,res) => {
    try {
        if(!req.query.page || !req.query.limit){
            return response("Pagination is  Required",{},404,res)
        }  
            let resp = await BookServices.Getall(
                req.query.page,
                req.query.limit);
        
        if(resp){
            return response("All User",resp.data,200,res)
        }else{
            return response("something worng",{},500,res)
        }
        
    } catch (err) {
        console.log("err",err);
        return response(err.message,err?.error,err.status,res)
    }

}   


const Add = async (req,res) => {
    try {
       let resp = await  BookServices.add(req.body);
       if(resp){
        return response("Book Added",resp.data,200,res)
       }else{
        return response("Something Went Worng",{},500,res)
       }
        
    } catch (err) {
        console.log(err)
        return response(err.msg,err?.error,err.status,res)
    }
}


const FindByIsdn = async (req,res) => {
    try {
        // console.log(req.query.id);
        let resp = await BookServices.FindByIsdn(req.params.id);
        if(resp){
            return response("User found",resp.data,200,res)
        } else{
            return response("Something Wrong",{},500,res)
        }
        
    } catch (err) {
        return response(err.msg, err?.error, err.status, res)
        
    }
    
}


const FindAndUpdate = async (req,res) => {
    try {
        let resp = await BookServices.Update(req.params.id,req.body);
        if(resp){
            return response("User Update Successfully",resp.data,200,res)
        } else{
            return response("Something Wrong",{},500,res)
        }
        
    } catch (err) {
        return response(err.msg, err?.error, err.status, res)
        
    }
    
}


const deleteById = async (req,res) => {
    try {
        let resp = await BookServices.Delete(req.params.id,req.body);
        if(resp){
            return response("User Deleted Successfully",resp.data,200,res)
        } else{
            return response("Something Wrong",{},500,res)
        }
        
    } catch (err) {
        return response(err.msg, err?.error, err.status, res)
        
    }
    
}


const Genre = async (req,res) => {
    try {
        if(!req.query.page || !req.query.limit){
            return response("Pagination is required",{},404,res)
        }   
          let resp = await BookServices.ByGenre(
                req.query.page,
                req.query.limit,
                req.query.genre,
               )
           if(resp){
            return response("User Found",resp.data,200,res)
           } else{
            return response("User not found",resp.data,500,res)
           }
         

    } catch (err) {
        return response(err.msg,err?.error,err.status,res)
    }

}


const Filter1 = async (req,res) => {
    try {
        if(!req.query.page || !req.query.limit){
            return response("Pagination is required",{},404,res)
        }
        let resp = await BookServices.filter(
            req.query.page,
            req.query.limit,
            req.query.genre,
            req.query.format,
        );
        if(resp){
            return response("Filter 1",resp.data, 200,res)
        }else{
            return response("Something Went Wrong", {},500,res)
        }

    } catch (err) {
        return response(err.message, err?.error, err.status ,res)
    }

}


const Filter2 =  async (req,res) => {
    try {
        if(!req.query.page || !req.query.limit){
            return response("Pagination is required",{},404,res)
        }
        let resp = await bookservices.filter2(
            req.query.page,
            req.query.limit,
            req.query.StartDate,
            req.query.EndDate,
            req.query.publisher,
        )

        if(resp){
            return response("Filter 2", resp.data,200,res)
        } else {
            return response("Something  Wrong",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}


const Filter3 = async (req,res) => {
    try {
        if(!req.query.page || !req.query.limit){
            return response("Pagination is required");
        }
      
         let resp = await BookServices.filter3(
            req.query.page,
            req.query.limit,
            req.query.price,
            req.query.title,
         );

         if(resp){
            return response("Filter 3", resp.data,200,res)
         } else{
            return response("Something Wrong",{},500,res)
         }
        
    } catch (err) {
        return response(err.message, err?.error, err.status,res)
    }
}


const Filter4 = async (req,res) => {
    try {
       if(!req.query.page || !req.query.limit){
        return response("Pganination is reqiured");
       } 
        let resp = await bookservices.filter4(
            req.query.page,
            req.query.limit,
            );
       if(resp) {
            return response("Filter 4" ,resp.data,200,res)
       }else{
        return response("Something Wrong",{},500,res)
       }
    } catch (err) {
      return response(err.message, err?.error, err.status, res)   
    }
}

module.exports = {
    GetAll,
    Add,
    FindByIsdn,
    FindAndUpdate,
    deleteById,
    Genre,
    Filter1,
    Filter2,
    Filter3,
    Filter4,
}