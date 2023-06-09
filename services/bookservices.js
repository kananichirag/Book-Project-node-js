
const Book = require('../models/user');
const cust = require('../models/orderuser');
const mongoose = require('mongoose');


module.exports = {
    Getall: (page, limit) => {
        return new Promise(async (res, rej) => {
            try {
                let qry = {};
                page = parseInt(page);
                limit = parseInt(limit);

                const user = await Book.aggregate([
                    { $match: qry },
                    { $skip: (page - 1) * limit },
                    { $limit: limit }
                ])
                res({
                    status: 200,
                    data: {
                        count: user.length,
                        result: user,
                    }

                })
            } catch (err) {
                console.log("err", err);
                rej({ status: 500, error: err, message: "Something Wrong" })
            }
        })
    },


    add: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let newBook = new Book(data)
                let save = await newBook.save()
                if (save) {
                    res({ data: save })
                } else {
                    rej({ status: 500, message: "something went Worng!!" })
                }
            } catch (error) {
                console.log(error);
                rej({ status: 500, message: "Something Went Worng" })
            }
        })
    },


    FindByIsdn: (id) => {
        return new Promise(async (res, rej) => {
            try {
                let user = await Book.aggregate([
                    { $match: { isbn: id } },
                ])
                res({
                    status: 200,
                    data: {
                        count: user.length,
                        result: user
                    }

                })
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" })
            }
        })
    },


    Update: (id, data) => {
        return new Promise(async (res, rej) => {
            try {
                let user = await Book.findByIdAndUpdate(id, data, { new: true })
                res({
                    status: 200,
                    data: {
                        count: user.length,
                        result: user
                    }

                })
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" })
            }
        })
    },


    Delete: (id) => {
        return new Promise(async (res, rej) => {
            try {
                let user = await Book.findByIdAndDelete(id)
                res({
                    status: 200,
                    data: {
                        count: user.length,
                        result: user
                    }

                })
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" })
            }
        })
    },


    ByGenre: (Page, Limit, genre) => {
        return new Promise(async (res, rej) => {
            try {
                let page = parseInt(Page)
                let limit = parseInt(Limit)
                let User = await Book.aggregate([
                    { $match: { genre: genre } },
                    {
                        $facet: {
                            total_count: [
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 }
                                    }
                                },
                                {
                                    $project: {
                                        _id: 0,

                                    }
                                }
                            ],

                            result: [
                                {
                                    $match: { genre: genre }
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        title: 0,
                                        country: 0,
                                        publication_date: 0,
                                        rating: 0,
                                    }
                                },
                                { $skip: (page - 1) * limit },
                                { $limit: limit }
                            ]
                        }
                    }

                ])


                res({
                    status: 200,
                    data: {
                        count: User.total_count,
                        Output: User,
                    }
                })
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" })
            }
        })
    },


    filter: (Page, Limit, genre, format) => {
        return new Promise(async (res, rej) => {
            try {
                let page = parseInt(Page);
                let limit = parseInt(Limit);

                let user = await Book.aggregate([
                    { $match: { genre: genre } },

                    {
                        $facet: {
                            total_count: [{
                                $group: {
                                    _id: null,
                                    count: { $sum: 1 }
                                },

                            }, {
                                $project: {
                                    _id: 0,
                                    total_count: 0
                                }
                            }],
                            result: [
                                {
                                    $match: {
                                        format: { $in: [format] }
                                    }
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        author_last_name: 0,
                                        title: 0,
                                        country: 0,
                                        rating: 0,
                                        page_cont: 0,
                                        publication_date: 0,
                                        publisher: 0,
                                        isbn: 0,
                                    }
                                },
                                { $skip: (page - 1) * limit },
                                { $limit: limit }
                            ]
                        }
                    }
                ]);
                res({
                    status: 200,
                    data: {
                        count: user.total_count,
                        Output: user
                    }
                })
            } catch (error) {
                rej({ status: 500, message: "Something  Wrong" })
            }
        })

    },


    filter2: (Page, Limit, StartDate, EndDate, publisher) => {
        return new Promise(async (res, rej) => {
            try {
                let page = parseInt(Page)
                let limit = parseInt(Limit)
                let qry = {};
                qry["$and"] = [
                    { "publication_date": { $gt: StartDate } },
                    { "publication_date": { $lt: EndDate } },
                    { "publisher": publisher },
                ]
                const user = await Book.aggregate([
                    { $match: qry },
                    {
                        $facet: {
                            total_count: [{
                                $group: {
                                    _id: null,
                                    count: { $sum: 1 }
                                }
                            },
                            {
                                $project: {
                                    total_count: 0,
                                    _id: 0,
                                }
                            }
                            ],
                            result: [
                                {
                                    $project: {
                                        _id: 0,
                                        title: 0,
                                        isbn: 0,
                                        rating: 0,
                                        author_last_name: 0,
                                        format: 0
                                    }
                                },
                                { $skip: (page - 1) * limit },
                                { $limit: limit }
                            ]
                        }
                    },


                ])
                res({
                    status: 200,
                    data: {
                        Output: user
                    }
                })
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" })
            }
        })
    },


    filter3: (Page, Limit, Price, title) => {
        return new Promise(async (res, rej) => {
            try {
                let page = parseInt(Page);
                let limit = parseInt(Limit);
                let price = parseInt(Price);

                const user = await Book.aggregate([
                    {
                        $match: {
                            title: title
                        }
                    },
                    {
                        $match: {
                            price: { $gt: price }
                        }
                    },
                    {
                        $facet: {
                            total_count: [{
                                $group: {
                                    _id: null,
                                    count: { $sum: 1 }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,

                                }
                            }],
                            result: [
                                {
                                    $project: {
                                        _id: 0,
                                        author_last_name: 0,
                                        isbn: 0,
                                        country: 0,
                                        genre: 0,
                                        publication_date: 0,
                                        publisher: 0
                                    }
                                },
                                { $skip: (page - 1) * limit },
                                { $limit: limit }
                            ]
                        }
                    }

                ])

                res({ status: 200, data: user })
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" });
            }
        })
    },


    filter4: (Page, Limit) => {
        return new Promise(async (res, rej) => {
            try {
                let page = parseInt(Page);
                let limit = parseInt(Limit);

                const qury = await Book.aggregate([
                    {
                        $project: {
                            _id: 1,
                            author_first_name:1,
                            rating: 1,
                            Response: {
                                $cond: { if: { $gte: ["$rating", 3] }, then: "true", else: "false" }
                            }
                        }
                    },
                    {
                        $set: {
                            language: "$Response"
                        }
                    },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                    {
                        $facet:{
                            total_count:[{
                                $group:{
                                    _id:null,
                                    count:{$sum:1}
                                }
                            },
                            {
                                $project:{
                                    _id:0
                                }
                            }
                        ],
                        result:[{
                            $project:{
                                _id:0
                            }
                        }]
                        }
                    }

                ])

                const op = qury.map((doc) => ({
                    updateOne: {
                        filter: { _id: doc._id },
                        update: { $set: { language: doc.Response } },
                        upsert: true
                    }
                }))
                const result = await Book.bulkWrite(op);
                res({ status: 200, data: qury})
            } catch (error) {
                rej({ status: 500, message: "Something Went Wrong" });
            }
        })
    },



    Bucket:()  => {
        return new Promise(async (res,rej)  => {
            try {
               
             let user = await Book.aggregate([
                   {
                    $bucket:{ 
                        groupBy:"$page_count",
                        boundaries:[50,70,90],   // we can set here bounsariels as we want
                        default: "other",
                        output:{
                            "count":{$sum:1},
                            "author":{
                                $push:{
                                    "name":{$concat:["$author_first_name"," ","$author_last_name"]},
                                    "page_count":"$page_count"
                                },
                                
                            }
                            
                            
                        }   
                    }
                   },
                   
             ])
                  
             res({status:200, data:user}) 
            } catch (error) {
                rej({status:500, message:"Something Went Wrong"})
            }
        })
    },


    Lookup :()  => {                                                                                                                    
        return new  Promise(async (res,rej)  => {
            try {
                
            let user = await Book.aggregate([
                 {
                    $lookup:
                    {
                        from:"customers",   // use the Collections name which was given in the Mongo DB Compass
                        localField:"price",
                        foreignField:"price",
                        as:"result",
                    }
                 },
                 {
                    $facet:{
                        total_count:[{
                            $group:{
                                _id:null,
                                count:{$sum :1}
                            }
                        },{
                            $project:{
                                _id:0
                            }
                        }
                    ],
                    result:[]
                    }
                 }     
            ])   
                 res({status:200, data:user})
              
            } catch (error) {
                rej({status:500, message:"Something Went Wrong"})
            }
        })

},


    Sort :()  => {
        return new Promise(async (res,rej)  => {
            try {
                
               let user = await Book.aggregate([
                   {
                    $match:{
                        title:"Ms",
                        language:"Albanian"
                    }
                   },
                    {$sort:{rating:1}},
                    {$limit:10}
               ])
           
           res({status:200,data:user})
            } catch (error) {
                rej({status:500, message:"Something Went Wrong"})
            }
        })
    }

}