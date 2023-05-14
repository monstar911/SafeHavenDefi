import React from "react";
import { Tag, VerifiedIcon, RefreshIcon } from "@pancakeswap/uikit";

const CoreTag = (props) => {
  return (
    <Tag
      variant="primary"
      outline
      startIcon={<VerifiedIcon width="18px" color="primary" mr="4px" />}
      {...props}
      style={{ background: "transparent" }}
    >
      No fees
    </Tag>
  );
};

const DualTag = (props) => {
  return (
    <Tag variant="text" outline {...props}>
      Dual
    </Tag>
  );
};

const ManualPoolTag = (props) => {
  return (
    <Tag
      variant="primary"
      outline
      startIcon={<RefreshIcon width="18px" color="primary" mr="4px" />}
      {...props}
      style={{ background: "transparent" }}
    >
      Manual
    </Tag>
  );
};

export { CoreTag, DualTag, ManualPoolTag };
