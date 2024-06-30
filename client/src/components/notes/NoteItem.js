import { useState } from "react";
import { Comment, CommentContent, CommentAuthor, CommentText, CommentActions, CommentAction, Modal, ModalHeader, ModalContent, ModalDescription, ModalActions, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { NoteConsumer } from "../../providers/NoteProvider";
import NoteForm from "./NoteForm";

const NoteItem = ({ id, subject, body, updateNote, deleteNote }) => {
  const [open, setUpdateModalOpen] = useState(false)
  const { paymentid } = useParams()

  return (
    <Comment>
      <CommentContent>
        <CommentAuthor>{subject}</CommentAuthor>
        <CommentText>
          {body}
        </CommentText>
        <CommentActions>
          <Modal
            onClose={() => setUpdateModalOpen(false)}
            onOpen={() => setUpdateModalOpen(true)}
            open={open}
            trigger={
              <CommentAction>Edit</CommentAction>
            }
          >
            <ModalHeader>Update Bill Details</ModalHeader>
            <ModalContent image>
              <ModalDescription>
                <NoteForm 
                  id={id}
                  subject={subject}
                  body={body}
                  updateNote={updateNote}
                  setUpdateModalOpen={setUpdateModalOpen}
                />
              </ModalDescription>
            </ModalContent>
            <ModalActions>
              <Button color='red' onClick={() => setUpdateModalOpen(false)}>
                Cancel
              </Button>
            </ModalActions>
          </Modal>
          <CommentAction onClick={(e) => deleteNote(paymentid, id)}>Delete</CommentAction>
        </CommentActions>
      </CommentContent>
    </Comment>
  )
}

const ConnectedNoteItem = (props) => (
  <NoteConsumer>
    { value => <NoteItem {...value} {...props} />}
  </NoteConsumer>
)

export default ConnectedNoteItem;