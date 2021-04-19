const express = require("express");
const notes = require ("./notes.js");

//permite crear el servidor web
//crear un objeto que represente  mi app web
//mediante servidor
const  app = express();

//definir el puerto de escucha del servidor
const port = 3000;


app.set("view engine","ejs")
app.use(express.static(__dirname+"/views"))

app.use(express.static("public"))


app.get("/",function(request,response){
      
        response.render("index",{
            message:"Welcome to App Note"
        })
       
})

app.use(express.urlencoded({
    extended:true
}))

app.post("/add_note",function(request,response){
    
    const title =request.body.title
    const body =request.body.body
    notes.addNote(title,body)
    response.redirect("/notes_created")

})

app.get("/notes_created", function(request,response){
    response.render("notes_created")
})

app.listen(port,function(){
    console.log("listenning at http://localhost:3000/")
})