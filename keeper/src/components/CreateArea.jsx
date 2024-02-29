import { useState } from "react";
import {v4 as uuidv4} from "uuid"

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
  
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={onChange} value={input.title} />
        <textarea name="body" placeholder="Take a note..." rows="3" onChange={onChange} value={input.body} />
        <button onClick={(event) => {
          props.onClick(input)
          setInput({
            id: uuidv4(),
            title: "",
            body: ""
          })
          event.preventDefault()
        }}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
