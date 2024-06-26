import { List } from 'semantic-ui-react';

import BillShow from './BillShow';

const BillList = ({ bills }) => (
  <List divided relaxed>
    { bills.map( b => 
      <BillShow 
        {...b}
      />
    )}   
  </List>
)

export default BillList;