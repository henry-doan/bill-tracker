import { useEffect, useState } from 'react';
import { Form, FormButton, FormGroup, FormInput, Select } from 'semantic-ui-react';

import { BillConsumer } from '../../providers/BillProvider';
import { categoryOptions } from './categories';

const BillForm = ({ setAdd, addBill, updateBill, id, name, category, setUpdateModalOpen }) => {
  const [bill, setBill] = useState({ name: '', category: '' })

  useEffect( () => {
    if (id) {
      setBill({ name, category })
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
    setBill({ name: '', category: '' })
  }

  return(
    <>
      { id ? <h1>Update Bill Details</h1> : null}
      <Form onSubmit={handleSubmit}>
        <FormGroup widths='equal'>
          <FormInput 
            fluid 
            label='Bill Name' 
            placeholder='Name' 
            name='name'
            value={bill.name}
            onChange={(e) => setBill({ ...bill, name: e.target.value })}
            required
          />
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
        <FormButton>Submit</FormButton>
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