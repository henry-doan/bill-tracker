import moment from 'moment';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Segment } from 'semantic-ui-react';

import { PaymentConsumer } from "../../providers/PaymentProvider";

const PaymentCharts = ({ payments }) => {
  const [data, setData] = useState([])

  useEffect( () => {
    setData(formatData())
  }, [payments])

  const formatData = () => {
    return payments.map( p => {
      return { name: moment(p.whenpaid).format('MM/DD/YY'), Amount: p.amount }
    })
  }

  return (
    <Segment raised>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="$"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Amount" stroke="#82ca9d" />
      </LineChart>
    </Segment>
  )
}

const ConnectedPaymentCharts = (props) => (
  <PaymentConsumer>
    { value => <PaymentCharts {...value} {...props} />}
  </PaymentConsumer>
)

export default ConnectedPaymentCharts;