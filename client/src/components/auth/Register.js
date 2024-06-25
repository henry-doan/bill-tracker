import { useState } from 'react';
import { AuthConsumer } from "../../providers/AuthProvider";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
      {/* <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          autoFocus
          name='email'
          value={user.email}
          placeholder='Email'
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label>Password</label>
        <input
          required
          name='password'
          value={user.password}
          placeholder='Password'
          type='password'
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label>Password Confirmation</label>
        <input
          required
          name='passwordConfirmation'
          value={user.passwordConfirmation}
          placeholder='Password Confirmation'
          type='password'
          onChange={(e) => setUser({ ...user, passwordConfirmation: e.target.value })}
        />
        <button type='submit'>Submit</button>
      </form> */}
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