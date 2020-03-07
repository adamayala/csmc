const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

//routes
app.get("/", async function(req, res){

    let volunteers = await getVolunteers();
    console.log(volunteers);
    res.render("index");
});


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});

function dbConnection(){
    let conn = mysql.createConnection({
                    host: "kil9uzd3tgem3naa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
                    user: "a465vv4cm6cc9v2n",
                    password: "ov7lszw7a8vyzhsp",
                    database:"m5yi9d8tprytfw7v"
    }); //createConnection
    return conn;
}

function getVolunteers(){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        
            let sql = `select * from volunteers`;
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                conn.end();
                resolve(rows);
            });
        });//connection
    });//promise
}

// app.get("/quotes", async function(req, res){
    
//     //let records = await getQuotes(req.query);
//     //res.render("quotes", {"records":records});

// });

// app.get("/authorInfo", async function(req, res){
    
//     //let rows = await getAuthorInfo(req.query.authorId);
//     //res.send(rows);

// });


// app.get("/dbTest", function(req, res){

//     let conn = dbConnection();
    
//     conn.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
    
//       let sql = "SELECT * from q_author where sex = 'F'";
    
//       conn.query(sql, function (err, rows, fields) {
//           if (err) throw err;
//           conn.end();
//           res.send(rows);
//       });
    
//     });

// });//dbTest

// //values in red must be updated
// function dbConnection(){

//   let conn = mysql.createConnection({
//                  host: "cst336db.space",
//                  user: "cst336_dbUser2",
//           password: "4lfan8",
//           database:"cst336_db2"
//       }); //createConnection

// return conn;

// }








// // function getQuotes(query){
// //     let conn = dbConnection();
// //     let keyword = query.keyword;
// //     let category = query.category;
// //     let author = query.author;
// //     let gender = query.gender;
// //     let params = [];
    
// //     return new Promise(function(resolve, reject){
    
// //         conn.connect(function(err) {
// //           if (err) throw err;
// //           console.log("Connected!");
        
// //           let sql = `select authorId, quote, firstName, lastName, category from q_quotes
// //                         natural join q_author
// //                         where
// //                         quote like '%${keyword}%'`;
                        
// //             if(category){
// //                 sql += " and category = ?";
// //                 params.push(category);
// //             }
            
// //             if(author){
// //                 console.log(author);
// //                 sql += " and authorId = ?";
// //                 params.push(author);
// //             }
            
// //             if(gender){
// //                 console.log("gender");
// //                 sql += " and sex = ?";
// //                 params.push(gender);
// //             }
            
// //             console.log(query);
            
// //             conn.query(sql, params, function (err, rows, fields) {
// //               if (err) throw err;
// //               conn.end();
// //               resolve(rows);
// //             });
        
// //         });//connection
// //     });//promise
// // }

// // function getCategories(){
// //     let conn = dbConnection();
    
// //     return new Promise(function(resolve, reject){
// //         conn.connect(function(err) {
// //           if (err) throw err;
// //           console.log("Connected!");
        
// //           let sql = `select distinct category
// //                         from q_quotes
// //                         order by category`;
        
// //           conn.query(sql, function (err, rows, fields) {
// //               if (err) throw err;
// //               conn.end();
// //               resolve(rows);
// //           });
        
// //         });//connection
// //     });//promise
// // }

// // function getAuthors(){
// //     let conn = dbConnection();
    
// //     return new Promise(function(resolve, reject){
// //         conn.connect(function(err) {
// //           if (err) throw err;
// //           console.log("Connected!");
        
// //           let sql = `select distinct authorId, firstName, lastName
// //                         from q_author`;
        
// //           conn.query(sql, function (err, rows, fields) {
// //               if (err) throw err;
// //               conn.end();
// //               resolve(rows);
// //           });
        
// //         });//connection
// //     });//promise
// // }

// // function getAuthorInfo(id){
// //     let conn = dbConnection();
    
// //     return new Promise(function(resolve, reject){
// //         conn.connect(function(err) {
// //           if (err) throw err;
// //           console.log("Connected!");
        
// //           let sql = `select * from q_author
// //                         where authorId = ${ id }`;
        
// //           conn.query(sql, function (err, rows, fields) {
// //               if (err) throw err;
// //               conn.end();
// //               resolve(rows);
// //           });
        
// //         });//connection
// //     });//promise
// // }