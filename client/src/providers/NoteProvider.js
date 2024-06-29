import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NoteContext = React.createContext();
export const NoteConsumer = NoteContext.Consumer;

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [msgs, setMsgs] = useState()
  const navigate = useNavigate()

  const getAllNotes = (paymentId) => {
    axios.get(`/api/payments/${paymentId}/notes`)
      .then( res => setNotes(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const addNote = (paymentId, note) => {
    axios.post(`/api/payments/${paymentId}/notes`, { note })
      .then( res => setNotes([...notes, res.data]))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const updateNote = (paymentId, id, note) => {
    axios.put(`/api/payments/${paymentId}/notes/${id}`, { note })
      .then(res => {
        const newUpdatedNotes = notes.map( p => {
          if (p.id === id) {
            return res.data
          }
          return p
        })
        setNotes(newUpdatedNotes)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const deleteNote = (id, paymentId) => {
    axios.delete(`/api/payments/${paymentId}/notes/${id}`)
      .then( res => setNotes( notes.filter(p => p.id !== id)))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  return (
    <NoteContext.Provider value={{
      notes, 
      getAllNotes,
      msgs,
      setMsgs,
      addNote,
      updateNote,
      deleteNote,
    }}>
      { children }
    </NoteContext.Provider>
  )
}

export default NoteProvider;