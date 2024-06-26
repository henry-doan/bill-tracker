import { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  Icon,
  ListContent, ListDescription, ListHeader, ListItem,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader
} from "semantic-ui-react";

import { BillConsumer } from "../../providers/BillProvider";
import BillForm from "./BillForm";

const BillShow = ({ id, name, category, updateBill, deleteBill }) => {
  const [open, setUpdateModalOpen] = useState(false)

  return (
    <ListItem>
      <ListContent>
        <ListHeader>{name}</ListHeader>
        <ListDescription>
          <Grid columns={3}>
            <GridRow>
              <GridColumn>
                Category: {category}
              </GridColumn>
              <GridColumn>
              </GridColumn>
              <GridColumn>
                <Button icon color='red' onClick={(e) => deleteBill(id)}>
                  <Icon name='trash'  />
                </Button>
                <Modal
                  onClose={() => setUpdateModalOpen(false)}
                  onOpen={() => setUpdateModalOpen(true)}
                  open={open}
                  trigger={
                    <Button icon color='yellow'>
                      <Icon name='pencil'  />
                    </Button>
                  }
                >
                  <ModalHeader>Update Bill Details</ModalHeader>
                  <ModalContent image>
                    <ModalDescription>
                      <BillForm 
                        id={id}
                        name={name}
                        category={category}
                        updateBill={updateBill}
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
                <Button icon color='green'>
                  <Icon name='eye'  />
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </ListDescription>
      </ListContent>
    </ListItem>
  )
} 

const ConnectedBillShow = (props) => (
  <BillConsumer>
    { value => <BillShow {...value} {...props} />}
  </BillConsumer>
)

export default ConnectedBillShow;