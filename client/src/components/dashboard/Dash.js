import { Container } from "semantic-ui-react";

import Bills from "../bills/Bills";
import MainStats from "./MainStats";

const Dash = () => (
  <>
    <Container>
      <MainStats />
      <Bills />
    </Container>
  </>
)

export default Dash;