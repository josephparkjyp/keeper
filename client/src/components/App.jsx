import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import { useState, useEffect } from "react"
import useFetch from "./useFetch"

function App() {

    const { data, loading, error } = useFetch("http://localhost:5000/notes")
    const [notes, setNotes] = useState([])

    useEffect(() => {
        if (data) {
            setNotes([...data])
        }
    }, [data])

    function addNote(note) {
        setNotes((prevNotes) => {
            return [...prevNotes, {id: note.id, title: note.title, body: note.body}]
        })

        fetch(`http://localhost:5000/add`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(note)})
            .then(res => res.json())
            .then(data => console.log('Success'))
            .catch(err => console.error('Error', err))
        
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((prevNote) => {
                return prevNote.id !== id
            })
        })

        fetch(`http://localhost:5000/delete/${id}`, {method: 'DELETE'})
            .then((res) => {
                if (res.ok) {
                    console.log('Note deleted successfully')
                } else {
                    console.error('Failed to delete the note')
                }
            })
    }

    return (
        <div>
            <Header />
            <CreateArea onClick={addNote} />
            {error && <p>Encountered error.</p>}
            {loading && <p>Loading...</p>}
            {!loading && notes.map((note) => {
                return <Note key={note.id} id={note.id} title={note.title} body={note.body} onClick={deleteNote} />
            })}
            <Footer />
        </div>
    )
}

export default App