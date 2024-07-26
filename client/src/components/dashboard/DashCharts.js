import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Grid, GridColumn, GridRow, Header, Segment, } from 'semantic-ui-react';

const COLORS = ['#fbbd08', '#21ba45', '#db2828', '#00b5ad', '#6435c9', '#f2711c', '#e03997', '#a5673f', '#767676'];

const DashCharts = ({ pieChartData = [], paymentByYear = [] }) => {

  const pieData = pieChartData.map(pay => { return { name: pay.name, value: parseFloat(pay.bill_total)} });

  return (
    <Segment raised>
      <Grid columns={2} divided stackable>
        <GridRow>
          <GridColumn>
            <Header textAlign='center'>Payment Total By Bill</Header>
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
                  pieData.map((e, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
              </Pie>
              <Legend />
            </PieChart>
          </GridColumn>
          <GridColumn>
            <Header textAlign='center'>Amount Spend Per Month</Header>
            {
              paymentByYear ?
              <LineChart
                width={500}
                height={300}
                data={paymentByYear}
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
              :
              <p>No Data</p>
            }
          </GridColumn>
        </GridRow>
      </Grid>
    </Segment>
  )
}

export default DashCharts;