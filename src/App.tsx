import { Box } from "@chakra-ui/react";
import { Forms } from "./components/forms";
import { Title } from "./components/title";

function App() {
  return (
    <Box
      backgroundColor={"indigoBlue"}
      color="lightYellow"
      h={"100vh"}
      w={"100vw"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <Title />
      <Forms />
    </Box>
  );
}

export default App;
