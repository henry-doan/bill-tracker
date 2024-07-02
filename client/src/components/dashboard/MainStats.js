import {
  StatisticValue,
  StatisticLabel,
  Statistic,
  Container,
} from 'semantic-ui-react';
import { useEffect } from 'react';

import { BillConsumer } from "../../providers/BillProvider";


const MainStats = ({ getBillCount, billCount, bills }) => {
  useEffect( () => {
    getBillCount()
  }, [])

  const { completed_count, overdue_count, pending_count, total_paid} = billCount
  return (
    <Container textAlign='center'>
      <Statistic color='red'>
        <StatisticValue>{pending_count}</StatisticValue>
        <StatisticLabel>Pending Bills</StatisticLabel>
      </Statistic>
      <Statistic color='yellow'>
        <StatisticValue>{overdue_count}</StatisticValue>
        <StatisticLabel>Overdue Bills</StatisticLabel>
      </Statistic>
      <Statistic color='green'>
        <StatisticValue>{completed_count}</StatisticValue>
        <StatisticLabel>Completed Bills</StatisticLabel>
      </Statistic>
      <Statistic color='teal'>
        <StatisticValue>{bills.length}</StatisticValue>
        <StatisticLabel>Total Bills</StatisticLabel>
      </Statistic>
      <Statistic color='violet'>
        <StatisticValue>${total_paid}</StatisticValue>
        <StatisticLabel>Total Amount Paid</StatisticLabel>
      </Statistic>
    </Container>
  )
}

const ConnectedMainStats = (props) => (
  <BillConsumer>
    { value => <MainStats {...value} {...props} />}
  </BillConsumer>
)

export default ConnectedMainStats;
