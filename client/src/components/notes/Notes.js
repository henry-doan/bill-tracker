import { useEffect, useState } from "react";
import { Button, Container, Header, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { NoteConsumer } from "../../providers/NoteProvider";
import NoteForm from './NoteForm';
import NoteList from "./NoteList";

const Notes = ({ notes, getAllNotes, msgs, setMsgs  }) => {
  const [adding, setAdd] = useState(false)
  const { paymentid } = useParams()

  useEffect( () => {
    getAllNotes(paymentid)
  }, [])

  return (
   <Container>
      <Modal
        onClose={() => setAdd(false)}
        onOpen={() => setAdd(true)}
        open={adding}
        trigger={<Button margin='large 0'>Add Note</Button>}
      >
        <ModalHeader>Add Note</ModalHeader>
        <ModalContent image>
          <ModalDescription>
            <NoteForm 
              setAdd={setAdd}
            />
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color='red' onClick={() => setAdd(false)}>
            Cancel
          </Button>
        </ModalActions>
      </Modal>
      <Header as='h1'>Notes</Header>
      { notes ? <NoteList notes={notes} /> : <p>No Notes</p> }
   </Container> 
  )
}

const ConnectedNotes= (props) => (
  <NoteConsumer>
    { value => <Notes {...value} {...props} />}
  </NoteConsumer>
)

export default ConnectedNotes;