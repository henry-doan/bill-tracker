import { Container, Segment } from 'semantic-ui-react';

const MainFooter = () => (
  <Segment inverted vertical textAlign='center' style={{ position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '3rem' }}>
    <Container>
      <p>
        © {(new Date().getFullYear())} Developed & Designed By Henry Doan
      </p>
    </Container>
  </Segment>
)

export default MainFooter;