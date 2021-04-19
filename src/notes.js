const fs = require("fs")
const chalk = require("chalk")
const { constants } = require("buffer")

//console.log("This is the notes.js module")

const  readNote = function(title){
    const notes = loadNotes()
    const foundNote = notes.find((elemento)=>{
        return elemento.title === title
    })

    if(foundNote){
        console.log("Title:"+foundNote.title+"Body"+foundNote.body)
    }



}

const  removeNote = function(title){
    const notes = loadNotes()
    const nuevasNotas=notes.filter((n)=> n.title!==title)
    console.log(nuevasNotas)

    
    saveNotes(nuevasNotas)
  

}
const modifyNote = function (title, newTitle) {
    let notes = loadNotes();
    noteIndex = notes.findIndex((element) => element.title === title);
    if (noteIndex === -1) return log(chalk.red("We couldn't find the note you were looking for"));
    notes[noteIndex].title = newTitle
    log(chalk.blue("The note was modified"))
    saveNotes(notes);
};


const listNotes = function(){
    const notes =loadNotes()
    notes.forEach(function(element){
        console.log("Title:"+element.title+"Body"+element.body)
    })

}

const editNote = function(title,body){
    const notes =loadNotes()
    notes.forEach(function(elemento){
        elemento[title] = elemento[title] == valorViejo ? valorNuevo : elemento[title]

        console.log("Title:"+elemento.title+"Body"+elemento.body)
    })

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
    readNote:readNote,
    removeNote,removeNote,
    modifyNote: modifyNote
}