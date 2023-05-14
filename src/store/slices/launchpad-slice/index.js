import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import launchpadsConfig from "../../../constants/launchpad";
import fetchLaunchpads from "./fetchLaunchpads";
import {
  fetchLaunchpadUserReferralsCount,
  fetchLaunchpadUserInfo,
  fetchUserHavenAmount,
} from "./fetchLaunchpadUser";
import { BIG_ZERO } from "../../../utils/bigNumber";

const noAccountLaunchpadConfig = launchpadsConfig.map((launchpad) => ({
  ...launchpad,
  userData: {
    referralsCount: "0",
    amount: BIG_ZERO,
    claimed: false,
    userhavenAmount: undefined,
    allocation: BIG_ZERO,
  },
}));

const initialState = {
  data: noAccountLaunchpadConfig,
  userDataLoaded: false,
};

export const fetchLaunchpadsPublicDataAsync = createAsyncThunk(
  "launchpads/fetchLaunchpadsPublicDataAsync",
  async (pids) => {
    const launchpadsToFetch = launchpadsConfig.filter((launchpadConfig) =>
      pids.includes(launchpadConfig.pid)
    );
    const launchpads = await fetchLaunchpads(launchpadsToFetch);
    return launchpads;
  }
);

export const fetchLaunchpadUserDataAsync = createAsyncThunk(
  "launchpad/fetchLaunchpadUserDataAsync",
  async ({ account, pids }) => {
    const launchpadsToFetch = launchpadsConfig.filter((launchpadConfig) =>
      pids.includes(launchpadConfig.pid)
    );
    const userLaunchpadReferralsCount = await fetchLaunchpadUserReferralsCount(
      account
    );
    const userLaunchpadInfo = await fetchLaunchpadUserInfo(account, pids);
    const userhavenAmount = await fetchUserHavenAmount(account);
    return launchpadsToFetch.map((launchpadConfig, index) => {
      return {
        pid: launchpadsToFetch[index].pid,
        referralsCount: userLaunchpadReferralsCount,
        userhavenAmount: userhavenAmount,
        amount: userLaunchpadInfo.userAmounts[index],
        claimed: userLaunchpadInfo.userClaimed[index],
        allocation: userLaunchpadInfo.userAllocation[index],
      };
    });
  }
);

export const launchpadsSlice = createSlice({
  name: "launchpad",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      fetchLaunchpadsPublicDataAsync.fulfilled,
      (state, action) => {
        state.data = state.data.map((launchpad) => {
          const liveLaunchpadData = action.payload.find(
            (launchpadData) => launchpadData.pid === launchpad.pid
          );
          return { ...launchpad, ...liveLaunchpadData };
        });
      }
    );

    builder.addCase(fetchLaunchpadUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl;
        const index = state.data.findIndex(
          (launchpad) => launchpad.pid === pid
        );
        state.data[index] = { ...state.data[index], userData: userDataEl };
      });
      state.userDataLoaded = true;
    });
  },
});

export default launchpadsSlice.reducer;
