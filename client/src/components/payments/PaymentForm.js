import moment from 'moment';
import { useEffect, useState } from 'react';
import { Form, FormButton, FormGroup, FormInput, Segment, Select } from 'semantic-ui-react';

import { PaymentConsumer } from '../../providers/PaymentProvider';
import { statusesOptions } from './statuses';

const PaymentForm = ({ setAdd, addPayment, updatePayment, id, amount, whenpaid, duedate, status, setUpdateModalOpen, billId }) => {
  const [payment, setPayment] = useState({ amount: 0.0, whenpaid: '', duedate: '', status: 'pending' })

  useEffect( () => {
    if (id) {
      setPayment({ 
        amount, 
        whenpaid: moment(whenpaid).format("YYYY-MM-DD"), 
        duedate: moment(duedate).format("YYYY-MM-DD"), 
        status 
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updatePayment(billId, id, payment)
      setUpdateModalOpen(false)
    } else {
      addPayment(billId, payment)
      setAdd(false)
    }
    setPayment({ amount: 0.0, whenpaid: '', duedate: '', status: 'pending' })
  }

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <FormInput 
          fluid 
          label='Amount' 
          placeholder='$0.00' 
          value={payment.amount}
          onChange={(e, data) => setPayment({ ...payment, amount: data.value })}
          required
          type="number" 
          step="0.01"
        />
        <FormGroup widths='equal'>
        <FormInput 
          fluid 
          label='When Paid?' 
          value={payment.whenpaid}
          onChange={(e, data) => setPayment({ ...payment, whenpaid: data.value })}
          required
          type="date"
        />
        <FormInput 
          fluid 
          label='Due Date' 
          value={payment.duedate}
          onChange={(e, data) => setPayment({ ...payment, duedate: data.value })}
          required
          type="date"
        />
        </FormGroup>
          <label>Payment Status</label>
          <Select
            fluid
            options={statusesOptions}
            name='status'
            value={payment.status}
            onChange={(e, data) => setPayment({ ...payment, status: data.value })}
            required
          />
        <Segment basic textAlign='center'>
          <FormButton basic>Submit</FormButton>
        </Segment>
      </Form>
    </>
  )
}

const ConnectedPaymentForm = (props) => (
  <PaymentConsumer>
    { value => <PaymentForm {...props} {...value} />}
  </PaymentConsumer>
)

export default ConnectedPaymentForm;