import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import { AuthConsumer } from "../../providers/AuthProvider";

const Login = ({ handleLogin }) => {
  const [user, setUser] = useState({ email: '', password: '' })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  }
  
  return (
    <>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            Login
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
              <Button fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            <Link to='/register'>
              &nbsp; Sign Up
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  )  
}

const ConnectedLogin = (props) => (
  <AuthConsumer>
    { value => <Login {...props} {...value} />}
  </AuthConsumer>
)

export default ConnectedLogin;