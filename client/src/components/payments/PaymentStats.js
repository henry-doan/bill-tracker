import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PaymentConsumer } from "../../providers/PaymentProvider";
import CountStats from '../shared/CountStats';

const PaymentStats = ({ getPaymentCount, paymentCount, payments }) => {
  const { id } = useParams()

  useEffect( () => {
    getPaymentCount(id)
  }, [payments])

  // const { completed_count, overdue_count, pending_count, total_paid } = billCount
  return (
    <CountStats {...paymentCount } itemLength={payments.length} itemTitle="Total Payments" />
  )
}

const ConnectedPaymentStats = (props) => (
  <PaymentConsumer>
    { value => <PaymentStats {...value} {...props} />}
  </PaymentConsumer>
)

export default ConnectedPaymentStats;