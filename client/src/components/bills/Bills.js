import { useEffect, useState } from "react";
import { Button, Header, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";

import { BillConsumer } from "../../providers/BillProvider";
import BillForm from './BillForm';
import BillList from "./BillList";

const Bills = ({ bills, getAllBills, msgs, setMsgs  }) => {
  const [adding, setAdd] = useState(false)

  useEffect( () => {
    getAllBills()
  }, [])

  return (
   <>
      <Modal
        onClose={() => setAdd(false)}
        onOpen={() => setAdd(true)}
        open={adding}
        trigger={<Button>Add Bill</Button>}
      >
        <ModalHeader>Add a New Bill</ModalHeader>
        <ModalContent image>
          <ModalDescription>
            <BillForm 
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
      <Header as='h1'>Bills $</Header>
      { bills ? <BillList bills={bills} /> : <p>No Bills</p> }
   </> 
  )
}

const ConnectedBills = (props) => (
  <BillConsumer>
    { value => <Bills {...value} {...props} />}
  </BillConsumer>
)

export default ConnectedBills;