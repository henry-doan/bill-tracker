import { Container, Segment } from 'semantic-ui-react';

const MainFooter = () => (
  <Segment inverted vertical textAlign='center'>
    <Container>
      <p>
        © {(new Date().getFullYear())} Developed & Designed By Henry Doan
      </p>
    </Container>
  </Segment>
)

export default MainFooter;