import { useState } from "react";
import Moment from 'react-moment';
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Icon,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  TableCell,
  TableRow,
} from "semantic-ui-react";

import { PaymentConsumer } from "../../providers/PaymentProvider";
import PaymentForm from "./PaymentForm";
  
const PaymentRow = ({ id, amount, whenpaid, duedate, status, updatePayment, deletePayment  }) => {
  const [open, setUpdateModalOpen] = useState(false)
  const params = useParams()

  return (
    <TableRow 
      positive={ status === 'Completed' ? true : false }
      negative={ status === 'Overdue' ? true : false }
    >
      <TableCell>${amount}</TableCell>
      <TableCell>
        <Moment format="MM/DD/YY">
          {whenpaid}
        </Moment>
      </TableCell>
      <TableCell>
        <Moment format="MM/DD/YY">
          {duedate}
        </Moment>
      </TableCell>
      <TableCell>
      { status === 'Completed' ? <Icon name='checkmark' /> : null }{status}</TableCell>
      <TableCell>
        <Button icon color='red' onClick={(e) => deletePayment(id, params.id)}>
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
              <PaymentForm 
                id={id}
                billId={params.id}
                amount={amount}
                whenpaid={whenpaid}
                duedate={duedate}
                status={status}
                updatePayment={updatePayment}
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
        <Link
          to={`/${id}/notes`}
        >
          <Button icon color='green'>
            <Icon name='file alternate outline' />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}

const ConnectedPaymentRow = (props) => (
  <PaymentConsumer>
    { value => <PaymentRow {...value} {...props} />}
  </PaymentConsumer>
)

export default ConnectedPaymentRow;