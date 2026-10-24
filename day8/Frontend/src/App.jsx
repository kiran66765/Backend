import { useState,useEffect } from 'react'
import axios from "axios"
function App(){
  const [notes, setNotes] = useState([])
  const [edit, setEdit] = useState(null)
  const [update, setUpdate] = useState("")

function fetchNotes(){

 axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setNotes(res.data.notes)
})

}

useEffect(()=>{
  
fetchNotes()
},[])

function handlesubmit(e){
  e.preventDefault()

  const {title,description}=e.target.elements
  console.log(title.value,description.value)

  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value,
  })
  .then(res=>{
    console.log(res.data)

    fetchNotes()
  })

}


function handleDelete(noteId){
 axios.delete("http://localhost:3000/api/notes/"+noteId)

 .then(res=>{
  console.log(res.data)
fetchNotes()
 })

}

function handleUpdate(note){
  setEdit(note._id)
  setUpdate(note.description)
  }

  function handleSave(noteId){
    axios.patch("http://localhost:3000/api/notes/" + noteId,{
      description:update
    })

  .then(res=>{
   console.log(res.data);
   setEdit(null)
   setUpdate("")
   fetchNotes()
  })
}

return (
    <>
<form className='note-create-form' onSubmit={handlesubmit}>
  <input name="title" type="text" placeholder='enter title' />
  <input  name="description" type="text"  placeholder='enter description'/>
  <button>create note</button>
</form>

    <div className="notes">
      {
        notes.map(note=>{
         return  <div className="note">
        <h1>{note.title}</h1>
       
        {edit===note._id?(
          <>
          <input 
        type="text"
        value={update}
        onChange={(e)=>
          setUpdate(e.target.value)
        
        }
        placeholder='enter new description'
         />
         <button 
         onClick={()=>handleSave(note._id)}>
          save
         </button>
         <button
         onClick={()=>setEdit(null)}>
          Cancel
         </button>
       
        </>
        ):(
          <>
           <p>{note.description}</p>
            <button
             onClick={()=>{handleDelete(note._id)}} >
              Delete
              </button>

               <button
                  onClick={() => handleUpdate(note)}
                >
                  Update
                </button>
          </>
        )
      }
        
       
                
      </div>
        })
      }
      </div>
      </>
  )
}


export default App
