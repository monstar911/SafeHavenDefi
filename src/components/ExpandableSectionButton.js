import styled from "styled-components";
import { ChevronDownIcon, ChevronUpIcon, Text } from "@pancakeswap/uikit";

const ExpandableSectionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: ${({theme}) => theme.colors.primary};
  }
`;

const ExpandableSectionButton = ({ onClick, expanded }) => {
  return (
    <ExpandableSectionButtonWrapper
      aria-label={"Hide or show expandable content"}
      role="button"
      onClick={() => onClick()}
    >
      <Text color="primary" bold>
        {expanded ? "Hide" : "Details"}
      </Text>
      {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </ExpandableSectionButtonWrapper>
  );
};

ExpandableSectionButton.defaultProps = {
  expanded: false,
};

export default ExpandableSectionButton;
