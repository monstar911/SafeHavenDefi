import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121415;
  color: #ffffff;
`;

function Loader() {
  return (
    <LoaderWrap>
      <CircularProgress size={120} color="inherit" />
    </LoaderWrap>
  );
}

export default Loader;
