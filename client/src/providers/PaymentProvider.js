import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentContext = React.createContext();
export const PaymentConsumer = PaymentContext.Consumer;

const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([])
  const [paymentCount, setPaymentCount] = useState({ completed_count: 0, overdue_count: 0, pending_count: 0, total_paid: 0.0 })
  const [msgs, setMsgs] = useState()
  const navigate = useNavigate()

  const getAllPayments = (billId) => {
    axios.get(`/api/bills/${billId}/payments`)
      .then( res => setPayments(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const addPayment = (billId, payment) => {
    axios.post(`/api/bills/${billId}/payments`, { payment })
      .then( res => setPayments([...payments, res.data]))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const updatePayment = (billId, id, payment) => {
    axios.put(`/api/bills/${billId}/payments/${id}`, { payment })
      .then(res => {
        const newUpdatedPayments = payments.map( p => {
          if (p.id === id) {
            return res.data
          }
          return p
        })
        setPayments(newUpdatedPayments)
      })
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const deletePayment = (id, billId) => {
    axios.delete(`/api/bills/${billId}/payments/${id}`)
      .then( res => setPayments( payments.filter(p => p.id !== id)))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  const getPaymentCount = (id) => {
    axios.get(`/api/bills/${id}/payment_count`)
      .then( res => setPaymentCount(res.data))
      .catch( err => {
        console.log(err)
        setMsgs({ msg: err.response.data.errors })
      })
  }

  return (
    <PaymentContext.Provider value={{
      payments, 
      getAllPayments,
      msgs,
      setMsgs,
      addPayment,
      updatePayment,
      deletePayment,
      paymentCount,
      getPaymentCount,
    }}>
      { children }
    </PaymentContext.Provider>
  )
}

export default PaymentProvider;