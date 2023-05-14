import { Box } from "@pancakeswap/uikit";

const Container = ({ children, ...props }) => (
  <Box px={["16px", "24px"]} mx="auto" maxWidth="1200px" {...props}>
    {children}
  </Box>
);

export default Container;
