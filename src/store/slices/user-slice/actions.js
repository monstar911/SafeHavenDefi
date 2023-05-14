import { createAction } from "@reduxjs/toolkit";

export const FarmStakedOnly = {
  ON_FINISHED: "onFinished",
  TRUE: "true",
  FALSE: "false",
};

export const StakeStakedOnly = {
  ON_FINISHED: "onFinished",
  TRUE: "true",
  FALSE: "false",
};

export const ViewMode = {
  TABLE: "TABLE",
  CARD: "CARD",
};

export const updateUserFarmStakedOnly = createAction(
  "user/updateUserFarmStakedOnly"
);

export const updateUserStakeStakedOnly = createAction(
  "user/updateUserStakeStakedOnly"
);

export const updateUserPoolStakedOnly = createAction(
  "user/updateUserPoolStakedOnly"
);

export const updateUserPoolsViewMode = createAction(
  "user/updateUserPoolsViewMode"
);

export const updateUserFarmsViewMode = createAction(
  "user/updateUserFarmsViewMode"
);

export const updateUserStakesViewMode = createAction(
  "user/updateUserStakesViewMode"
);

export const toggleTheme = createAction("user/toggleTheme");
