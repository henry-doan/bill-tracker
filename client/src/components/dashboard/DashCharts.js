import moment from 'moment';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { Grid, GridColumn, GridRow, Header, Segment, Dropdown, Select } from 'semantic-ui-react';

const COLORS = ['#fbbd08', '#21ba45', '#db2828', '#00b5ad', '#6435c9', '#f2711c', '#e03997', '#a5673f', '#767676'];

const DashCharts = ({ pieChartData = [], getPaymentByYear, paymentByYear, earlyYear, latestYear,  }) => {
  const [data, setData] = useState([])
  const [selectedYear, setSelectedYear] = useState(earlyYear)

  useEffect( () => {
    async function fetchMyAPI() {
      getPaymentByYear(2024)
      setData(formatData())
    }

    fetchMyAPI()
  }, [])

  const pieData = pieChartData.map(pay => { return { name: pay.name, value: parseFloat(pay.bill_total)} });

  const formatData = () => {
    return paymentByYear.map( p => {
      return { name: moment(p.whenpaid).format('MM/DD/YY'), Amount: p.amount }
    })
  }

  const yearOptions = () => {
    let years = [];
    while ( earlyYear <= latestYear ) {
      let newYear = earlyYear + 1
      years.push({ key: newYear, value: newYear, text: newYear });
    }   
    return years;
  }
 
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
            <Dropdown
              fluid
              selection
              options={yearOptions()}
              defaultValue={{ key: '2024', value: '2024', text: '2024' }}
              onChange={(e, data) => setSelectedYear(data.value)}
            />
            <Select
              fluid
              label='Selected Year'
              name='selectedYear'
              // value={selectedYear}
              onChange={(e, data) => setSelectedYear(data.value)}
              options={yearOptions()}
            />
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
        </GridRow>
      </Grid>
    </Segment>
  )
}

export default DashCharts;