import { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { Button, Container, Header, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";

import { PaymentConsumer } from "../../providers/PaymentProvider";
import PaymentCharts from "./PaymentCharts";
import PaymentForm from './PaymentForm';
import PaymentStats from "./PaymentStats";
import PaymentTable from "./PaymentTable";

const Payments = ({ payments, getAllPayments, msgs, setMsgs, paymentCount, getPaymentCount  }) => {
  const [adding, setAdd] = useState(false)
  const [bill, setBill] = useState({ category: '' })

  const location = useLocation()
  const { id } = useParams()

  useEffect( () => {
    getAllPayments(id)
    getPaymentCount(id)

    if (id) {
      const { category } = location.state
      setBill({ category })
    }
  }, [])
  
  return (
   <Container>
      <PaymentCharts />
      <PaymentStats {...paymentCount} itemLength={payments.length} itemTitle="Total Payments" />
      <Modal
        onClose={() => setAdd(false)}
        onOpen={() => setAdd(true)}
        open={adding}
        trigger={<Button>+</Button>}
      >
        <ModalHeader>Add a Payment Details</ModalHeader>
        <ModalContent image>
          <ModalDescription>
            <PaymentForm 
              setAdd={setAdd}
              billId={id}
            />
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color='red' onClick={() => setAdd(false)}>
            Cancel
          </Button>
        </ModalActions>
      </Modal>
      <Header as='h1'>{bill.category} Payments</Header>
      { payments ? <PaymentTable payments={payments} /> : <p>No Payments Made</p> }
   </Container> 
  )
}

const ConnectedPayments = (props) => (
  <PaymentConsumer>
    { value => <Payments {...value} {...props} />}
  </PaymentConsumer>
)

export default ConnectedPayments;