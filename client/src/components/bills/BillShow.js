import { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  ListContent, ListDescription, ListItem,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader
} from "semantic-ui-react";

import { BillConsumer } from "../../providers/BillProvider";
import BillForm from "./BillForm";

const BillShow = ({ id, category, updateBill, deleteBill }) => {
  const [open, setUpdateModalOpen] = useState(false)

  return (
    <ListItem>
      <ListContent>
        <ListDescription>
          <Grid columns={3}>
            <GridRow>
              <GridColumn>
                <Header>{category}</Header>
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