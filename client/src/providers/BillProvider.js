import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BillContext = React.createContext();
export const BillConsumer = BillContext.Consumer;

const BillProvider = ({ children }) => {
  const [bills, setBills] = useState([])
  const [billCount, setBillCount] = useState()
  const [msgs, setMsgs] = useState()
  const navigate = useNavigate()

  const getAllBills = () => {
    axios.get('/api/bills')
      .then( res => setBills(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const addBill = (bill) => {
    axios.post('/api/bills', { bill })
      .then( res => setBills([...bills, res.data]))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const updateBill = (id, bill) => {
    axios.put(`/api/bills/${id}`, { bill })
      .then(res => {
        const newUpdatedBills = bills.map( b => {
          if (b.id === id) {
            return res.data
          }
          return b
        })
        setBills(newUpdatedBills)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const deleteBill = (id) => {
    axios.delete(`/api/bills/${id}`)
      .then( res => setBills( bills.filter(b => b.id !== id)))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const getBillCount = () => {
    axios.get('/api/bill_count')
      .then( res => setBillCount(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  return (
    <BillContext.Provider value={{
      bills, 
      getAllBills,
      msgs,
      setMsgs,
      addBill,
      updateBill,
      deleteBill,
      getBillCount,
      billCount,
    }}>
      { children }
    </BillContext.Provider>
  )
}

export default BillProvider;