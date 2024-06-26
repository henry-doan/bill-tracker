import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Menu,
  Segment,
} from 'semantic-ui-react';

import { AuthConsumer } from "../../providers/AuthProvider";

const Navbar = ({user, handleLogout }) => {
  
  const rightNavItems = () => {
    if (user) {
      return (
        <>
          <Menu.Item as='a' active>
            <Link to='/dash'>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <Button as='a' inverted primary style={{ marginLeft: '0.5em' }} onClick={ () => handleLogout() }>
              Logout
            </Button>
          </Menu.Item>
        </>
      )
    } else {
      return (
        <>
          <Menu.Item as='a' active>
            <Link to='/'>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item as='a'>
            <Link to='/about'>
              About
            </Link>
          </Menu.Item>
          <Menu.Item as='a'>
            <Link to='/contact'>
              Contact
            </Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <Link to='/login'>
              <Button as='a' inverted>
                Log in
              </Button>
            </Link>
            <Link to='/register'>
              <Button as='a' inverted primary style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </Link>
          </Menu.Item>
        </>
      )
    }
  }
  
  return (
    <>
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 50, padding: '1em 0em' }}
        vertical
      >
        <Menu
          fixed={'top'}
          inverted
          size='large'
        >
          <Container>
            { rightNavItems() }
          </Container>
        </Menu>
      </Segment>
    </>
  )
}

const ConnectedNavbar = (props) => (
  <AuthConsumer> 
    { value => <Navbar { ...props } { ...value } /> }
  </AuthConsumer>
)
 
export default ConnectedNavbar;