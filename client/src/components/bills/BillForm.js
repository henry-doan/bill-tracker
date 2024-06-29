import { useEffect, useState } from 'react';
import { Form, FormButton, FormGroup, Segment, Select } from 'semantic-ui-react';

import { BillConsumer } from '../../providers/BillProvider';
import { categoryOptions } from './categories';

const BillForm = ({ setAdd, addBill, updateBill, id, category, setUpdateModalOpen }) => {
  const [bill, setBill] = useState({ category: '' })

  useEffect( () => {
    if (id) {
      setBill({ category })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateBill(id, bill)
      setUpdateModalOpen(false)
    } else {
      addBill(bill)
      setAdd(false)
    }
    setBill({ category: '' })
  }

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup widths='equal'>
          <Select
            fluid
            label='Category'
            options={categoryOptions}
            name='category'
            value={bill.category}
            onChange={(e, data) => setBill({ ...bill, category: data.value })}
            required
          />
        </FormGroup>
        <Segment basic textAlign='center'>
          <FormButton basic>Submit</FormButton>
        </Segment>
      </Form>
    </>
  )
}

const ConnectedBillForm = (props) => (
  <BillConsumer>
    { value => <BillForm {...props} {...value} />}
  </BillConsumer>
)

export default ConnectedBillForm;