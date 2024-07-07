import moment from 'moment';
import { useEffect, useState } from 'react';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis, } from 'recharts';
import { Grid, GridColumn, GridRow, Header, Segment } from 'semantic-ui-react';

import { useParams } from 'react-router-dom';
import { PaymentConsumer } from "../../providers/PaymentProvider";

const COLORS = ['#fbbd08', '#21ba45', '#db2828'];

const PaymentCharts = ({ getPaymentCount, paymentCount, payments }) => {
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect( () => {
    getPaymentCount(id)
    setData(formatData())
  }, [payments])

  const formatData = () => {
    return payments.map( p => {
      return { name: moment(p.whenpaid).format('MM/DD/YY'), Amount: p.amount }
    })
  }

  const pieData = [
    { name: 'Pending', value: paymentCount.pending_count },
    { name: 'Completed', value: paymentCount.completed_count },
    { name: 'Overdue', value: paymentCount.overdue_count },
  ];

  return (
    <Segment raised>
      <Grid columns={2} divided stackable>
        <GridRow>
          <GridColumn>
            <Header textAlign='center'>Amount Spend Per Month</Header>
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
          </GridColumn>
          <GridColumn>
            <Header textAlign='center'>Payment Statuses</Header>
            <PieChart width={500} height={500}>
              <Pie
                data={pieData} 
                cx="50%" 
                cy="50%" 
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {
                  data.map((e, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
              </Pie>
              <Legend />
            </PieChart>
          </GridColumn>
        </GridRow>
      </Grid>
    </Segment>
  )
}

const ConnectedPaymentCharts = (props) => (
  <PaymentConsumer>
    { value => <PaymentCharts {...value} {...props} />}
  </PaymentConsumer>
)

export default ConnectedPaymentCharts;