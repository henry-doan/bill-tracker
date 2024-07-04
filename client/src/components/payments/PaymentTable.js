import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, } from 'semantic-ui-react';

import PaymentRow from './PaymentRow';

const PaymentTable = ({ payments }) => (
  <Table celled>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Amount</TableHeaderCell>
        <TableHeaderCell>When Paid</TableHeaderCell>
        <TableHeaderCell>Due Date</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableRow>
    </TableHeader>

    <TableBody>
      { payments.map( p => 
        <PaymentRow 
          {...p}
          key={p.id}
        />
      )}  
    </TableBody>
  </Table>
)

export default PaymentTable;