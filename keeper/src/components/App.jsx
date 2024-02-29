import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import { useState } from "react"

function App() {

    const [notes, setNotes] = useState([])

    function addNote(note) {
        setNotes((prevNotes) => {
            return [...prevNotes, {id: note.id, title: note.title, body: note.body}]
        })
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((prevNote) => {
                return prevNote.id !== id
            })
        })
    }

    return (
        <div>
            <Header />
            <CreateArea onClick={addNote} />
            {notes.map((note) => {
                return <Note key={note.id} id={note.id} title={note.title} body={note.body} onClick={deleteNote} />
            })}
            <Footer />
        </div>
    )
}

export default App