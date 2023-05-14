import React, { useState } from "react";
import styled from "styled-components";
import {
  Flex,
  CardFooter,
  ExpandableLabel,
  HelpIcon,
  useTooltip,
} from "@pancakeswap/uikit";
import { ManualPoolTag } from "../../../../../components/Tags";
import ExpandedFooter from "./ExpandedFooter";

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`;

const Footer = ({ stake, account }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const manualTooltipText =
    "You must harvest and compound your earnings from this stake manually.";

  const { targetRef, tooltip, tooltipVisible } = useTooltip(manualTooltipText, {
    placement: "bottom",
  });

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <Flex alignItems="center">
          <ManualPoolTag />
          {tooltipVisible && tooltip}
          <Flex ref={targetRef}>
            <HelpIcon ml="4px" width="20px" height="20px" color="lightText" />
          </Flex>
        </Flex>
        <ExpandableLabel
          expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Details"}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && <ExpandedFooter stake={stake} account={account} />}
    </CardFooter>
  );
};

export default Footer;
