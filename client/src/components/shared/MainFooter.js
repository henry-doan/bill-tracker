import { Container, Segment } from 'semantic-ui-react';

const MainFooter = () => (
  <Segment inverted vertical style={{ margin: '5em 0em 0em'}}>
    <Container textAlign='center'>
      <p>
        © {(new Date().getFullYear())} Developed & Designed By Henry Doan
      </p>
    </Container>
  </Segment>
)

export default MainFooter;