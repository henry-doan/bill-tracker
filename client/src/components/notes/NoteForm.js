import { useEffect, useState } from 'react';
import { Form, FormButton, FormInput, FormTextArea, Segment,  } from 'semantic-ui-react';

import { NoteConsumer } from '../../providers/NoteProvider';
import { useParams } from 'react-router-dom';

const NoteForm = ({ setAdd, addNote, updateNote, id, subject, body, setUpdateModalOpen }) => {
  const [note, setNote] = useState({ subject: '', body: '' })
  const { paymentid } = useParams()

  useEffect( () => {
    if (id) {
      setNote({ subject, body })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateNote(paymentid, id, note)
      setUpdateModalOpen(false)
    } else {
      addNote(paymentid, note)
      setAdd(false)
    }
    setNote({ subject: '', body: '' })
  }

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <FormInput 
          fluid 
          label='Subject' 
          name='subject'
          value={note.subject}
          onChange={(e) => setNote({ ...note, subject: e.target.value })}
          required
        />
        <FormTextArea 
          name='body'
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
          required
        />
        <Segment basic textAlign='center'>
          <FormButton basic>Submit</FormButton>
        </Segment>
      </Form>
    </>
  )
}

const ConnectedNoteForm = (props) => (
  <NoteConsumer>
    { value => <NoteForm {...props} {...value} />}
  </NoteConsumer>
)

export default ConnectedNoteForm;