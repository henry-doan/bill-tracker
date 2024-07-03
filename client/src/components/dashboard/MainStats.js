import { useEffect } from 'react';

import { BillConsumer } from "../../providers/BillProvider";
import CountStats from '../shared/CountStats';


const MainStats = ({ getBillCount, billCount, bills }) => {
  useEffect( () => {
    getBillCount()
  }, [])

  return (
    <CountStats {...billCount } itemLength={bills.length} itemTitle="Total Bills" />
  )
}

const ConnectedMainStats = (props) => (
  <BillConsumer>
    { value => <MainStats {...value} {...props} />}
  </BillConsumer>
)

export default ConnectedMainStats;
