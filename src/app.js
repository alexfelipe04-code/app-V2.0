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
            titulo:"Welcome to App Note"
        })
       
})




app.use(express.urlencoded({
    extended:true
}))


  
  
app.post("/add_archivo",function(request,response){
    
    const title =request.body.title
    const body =request.body.body
    const bd= 0
    notes.CrearArchivo(title,body)
    notes.addNote(title,bd)
    response.redirect("/lista_archivos")

})




app.post("/Ver_archivo",function(request,response){
    
    const title =request.body.prodId
    const archivo = notes.leerArchivo(title);
    console.log("hola"+archivo);
    response.render("VerArchivo.ejs",{
    archivo:archivo,title:title
    })

})

app.post("/editar_archivo",function(request,response){
    
    const title =request.body.prodId
    const body =request.body.body
    notes.ModificarArchivo(title,body)
    response.redirect("/lista_Archivos")

})


app.get("/lista_archivos",function(request,response){
      
    const notes_array = notes.listNotes();
    response.render("lista_Archivos.ejs",{
        notes_array:notes_array
    })
    console.log(notes_array);
   
})

app.post("/eliminarArchivo",function(request,response){
    
    const title =request.body.prodId
    console.log("archivo a elimnar"+title)
    notes.removeNote(title)
    response.redirect("/lista_Archivos")

})


app.get("/Crear_archivo", function(request,response){
    response.render("Crear_archivo")
})




app.get("/index", function(request,response){
    response.render("index")
})



app.get("/cabecera", function(request,response){
    response.render("cabecera")
})



  
app.use((req, res, next) => {
    res.status(404).render("404", { titulo: "Página 404" });
  });

app.listen(port,function(){
    console.log("listenning at http://localhost:3000/")
})

