import { useState } from "react";
import {v4 as uuidv4} from "uuid"
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  
  const [input, setInput] = useState({
    id: uuidv4(),
    title: "",
    body: ""
  })

  function onChange(event) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value
      }
    })
  }


  const [clicked, setClicked] = useState(false)

  function onClick(event) {
    setClicked(true)
  }
  
  return (
    <div>
      <form className="create-note">
        {clicked && <input name="title" placeholder="Title" onChange={onChange} value={input.title} />}
        <textarea name="body" placeholder="Take a note..." rows={clicked ? "3" : "1"} onClick={onClick} onChange={onChange} value={input.body} />
        <Zoom in={clicked}>
          <Fab onClick={(event) => {
            props.onClick(input)
            setInput({
              id: uuidv4(),
              title: "",
              body: ""
            })
            event.preventDefault()
          }}><AddIcon /></Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
