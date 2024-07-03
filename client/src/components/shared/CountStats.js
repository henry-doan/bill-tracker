import {
  Container,
  Statistic,
  StatisticLabel,
  StatisticValue,
} from 'semantic-ui-react';

const CountStats = ({ completed_count, overdue_count, pending_count, total_paid, itemLength, itemTitle }) => (
  <Container textAlign='center'>
    <Statistic color='yellow'>
      <StatisticValue>{pending_count}</StatisticValue>
      <StatisticLabel>Pending Bills</StatisticLabel>
    </Statistic>
    <Statistic color='red'>
      <StatisticValue>{overdue_count}</StatisticValue>
      <StatisticLabel>Overdue Bills</StatisticLabel>
    </Statistic>
    <Statistic color='green'>
      <StatisticValue>{completed_count}</StatisticValue>
      <StatisticLabel>Completed Bills</StatisticLabel>
    </Statistic>
    <Statistic color='teal'>
      <StatisticValue>{itemLength}</StatisticValue>
      <StatisticLabel>{itemTitle}</StatisticLabel>
    </Statistic>
    <Statistic color='violet'>
      <StatisticValue>${total_paid}</StatisticValue>
      <StatisticLabel>Total Amount Paid</StatisticLabel>
    </Statistic>
  </Container>
)

export default CountStats;