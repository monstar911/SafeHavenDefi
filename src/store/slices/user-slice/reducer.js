import { createReducer } from "@reduxjs/toolkit";
import {
  FarmStakedOnly,
  updateUserFarmStakedOnly,
  updateUserFarmsViewMode,
  updateUserPoolStakedOnly,
  updateUserPoolsViewMode,
  updateUserStakeStakedOnly,
  updateUserStakesViewMode,
  ViewMode,
  toggleTheme,
} from "./actions";

export const initialState = {
  userFarmStakedOnly: FarmStakedOnly.ON_FINISHED,
  userPoolStakedOnly: false,
  userStakeStakedOnly: false,
  userPoolsViewMode: ViewMode.CARD,
  userFarmsViewMode: ViewMode.CARD,
  userStakesViewMode: ViewMode.CARD,
  isDark: true,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      updateUserFarmStakedOnly,
      (state, { payload: { userFarmStakedOnly } }) => {
        state.userFarmStakedOnly = userFarmStakedOnly;
      }
    )
    .addCase(
      updateUserPoolStakedOnly,
      (state, { payload: { userPoolStakedOnly } }) => {
        state.userPoolStakedOnly = userPoolStakedOnly;
      }
    )
    .addCase(
      updateUserPoolsViewMode,
      (state, { payload: { userPoolsViewMode } }) => {
        state.userPoolsViewMode = userPoolsViewMode;
      }
    )
    .addCase(
      updateUserFarmsViewMode,
      (state, { payload: { userFarmsViewMode } }) => {
        state.userFarmsViewMode = userFarmsViewMode;
      }
    )
    .addCase(
      updateUserStakeStakedOnly,
      (state, { payload: { userStakeStakedOnly } }) => {
        state.userStakeStakedOnly = userStakeStakedOnly;
      }
    )
    .addCase(
      updateUserStakesViewMode,
      (state, { payload: { userStakesViewMode } }) => {
        state.userStakesViewMode = userStakesViewMode;
      }
    )
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark;
    })
);
