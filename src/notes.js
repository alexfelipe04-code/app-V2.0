const fs = require("fs")
const chalk = require("chalk")
const { constants } = require("buffer")

//console.log("This is the notes.js module")
const log = console.log;



const  removeNote = function(title){
    const notes = loadNotes()
    const nuevasNotas=notes.filter((n)=> n.title!==title)
    const archivo1 = './'+title+'.txt';
    fs.unlinkSync(archivo1);
    console.log('El archivo ha sido eliminado');
    
    console.log(nuevasNotas)

    
    saveNotes(nuevasNotas)
  

}


const CrearArchivo = function(title,body){
    const archivo = title+'.txt';
    const contenido = body;
    fs.writeFileSync(archivo, contenido);
    
}


const leerArchivo = function(title){
    const titulo= title
    console.log("soy el titulo"+titulo)
    const archivo1 = './'+title+'.txt';
    const archivo = fs.readFileSync(archivo1, 'UTF-8');
        console.log(archivo);
    
    console.log('Contenido del archivo...');

    return archivo

    
}

const ModificarArchivo = function(title,body){
    const archivo = title+'.txt';
    const contenido = body;
    fs.writeFileSync(archivo, contenido);
    
}






const listNotes = function(){
    const notes =loadNotes()
    notes.forEach(function(element){
        console.log("Title:"+element.title+"Body"+element.body)
    })
    return notes
}





const addNote = function(title, body){
    console.log("This is addNote function")
    // Load notes
    let notes = loadNotes()
    console.log(notes)

    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })


    if (duplicateNotes.length === 0){
        note = {
            title:title,
            body:body
        }
        notes.push(note)
        console.log(notes)
        // Save note to file
        saveNotes(notes)
    }else{
        console.log("Note already exist!")
    }

    
    
}

const saveNotes = function(notes){
    //JSON.stringify convierte un objeto JavaScript (note) a un JSON string
    
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",notesJSON)
}

const loadNotes = function(){
    try{
        dataBuffer = fs.readFileSync("notes.json")
        data = dataBuffer.toString()
        //JSON.parse convierte un JSON string a un objeto JavaScript
        notesJSON = JSON.parse(data)
        console.log(data)
        return notesJSON
    }catch (e){
        console.log("File does not exist!")
        return []
    }
}

module.exports ={
    addNote:addNote,
    listNotes:listNotes,
    removeNote,removeNote,
    CrearArchivo:CrearArchivo,
    leerArchivo: leerArchivo,
    ModificarArchivo:ModificarArchivo 
}