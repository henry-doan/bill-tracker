import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import { AuthConsumer } from "../../providers/AuthProvider";

const Register = ({ handleRegister }) => {
  const [user, setUser] = useState({ email: '', password: '', passwordConfirmation: '' }) 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password === user.passwordConfirmation) {
      handleRegister(user);
     } else {
      alert('Passwords Do Not Match!')
     }
  }
  
  return (
    <>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            Register
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                type="email"
                autoFocus
                required         
                name='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                fluid 
                icon='user' 
                iconPosition='left' 
                placeholder='E-mail address' 
              />
              <Form.Input
                required
                name='password'
                value={user.password}
                placeholder='Password'
                type='password'
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                fluid
                icon='lock'
                iconPosition='left'
              />
              <Form.Input
                required
                name='passwordConfirmation'
                value={user.passwordConfirmation}
                placeholder='Password Confirmation'
                type='password'
                onChange={(e) => setUser({ ...user, passwordConfirmation: e.target.value })}
                fluid
                icon='lock'
                iconPosition='left'
              />
              <Button fluid size='large'>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account?
            <Link to='/login'>
              &nbsp; Login
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  )
}

const ConnectedRegister = (props) => (
  <AuthConsumer>
    { value => <Register { ...props } {...value} /> }
  </AuthConsumer>
)

export default ConnectedRegister;