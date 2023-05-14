import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import poolsConfig from "../../../constants/pools";
import fetchPools from "./fetchPools";
import {
  fetchPoolUserEarnings,
  fetchPoolUserAllowances,
  fetchPoolUserTokenBalances,
  fetchPoolUserStakedBalances,
  fetchPoolUserLastDepositTime,
  fetchPoolWithdrawFee,
} from "./fetchPoolUser";
import fetchFarmsPrices from "../farms-slice/fetchFarmsPrices";
import { BIG_ZERO } from "../../../utils/bigNumber";
import { getPoolApr } from "../../../utils/apr";

const noAccountPoolConfig = poolsConfig.map((pool) => ({
  ...pool,
  userData: {
    allowance: "0",
    tokenBalance: "0",
    stakedBalance: "0",
    earnings: "0",
  },
}));

const initialState = {
  data: noAccountPoolConfig,
  userDataLoaded: false,
};

export const fetchPoolsPublicDataAsync = createAsyncThunk(
  "pools/fetchPoolsPublicDataAsync",
  async (pids) => {
    const poolsToFetch = poolsConfig.filter((poolConfig) =>
      pids.includes(poolConfig.pid)
    );
    const stakes = await fetchPools(poolsToFetch);
    const stakesWithPrices = await fetchFarmsPrices(stakes);
    const stakesWithoutHelperLps = stakesWithPrices.filter((stake) => {
      return stake.pid || stake.pid === 0;
    });
    const sltStakes = stakesWithoutHelperLps.filter((stake) => stake.pid === 19);
    const sltPriceBusd = sltStakes[0].tokenPriceBusd;
    const stakesWithApr = stakesWithoutHelperLps.map((stake) => {
      const totalLiquidity =
        new BigNumber(stake.stakeTokenRatio).times(stake.tokenPriceBusd) ||
        BIG_ZERO;
      const apr = getPoolApr(
        stake.tokenPriceBusd,
        new BigNumber(sltPriceBusd),
        stake.stakeTokenRatio,
        new BigNumber(stake.earningsPerBlock)
      );
      return { ...stake, liquidity: totalLiquidity, apr };
    });
    return stakesWithApr;
  }
);

export const fetchPoolUserDataAsync = createAsyncThunk(
  "stakes/fetchPoolUserDataAsync",
  async ({ account, pids }) => {
    const poolsToFetch = poolsConfig.filter((poolConfig) =>
      pids.includes(poolConfig.pid)
    );
    const userStakeAllowances = await fetchPoolUserAllowances(
      account,
      poolsToFetch
    );
    const userStakeTokenBalances = await fetchPoolUserTokenBalances(
      account,
      poolsToFetch
    );
    const userStakedBalances = await fetchPoolUserStakedBalances(
      account,
      poolsToFetch
    );
    const userStakeEarnings = await fetchPoolUserEarnings(
      account,
      poolsToFetch
    );
    const userFarmWithdrawFee = await fetchPoolWithdrawFee(
      account,
      poolsToFetch
    );
    const lastDepositTime = await fetchPoolUserLastDepositTime(
      account,
      poolsToFetch
    );

    return userStakeAllowances.map((stakeAllowance, index) => {
      return {
        pid: poolsToFetch[index].pid,
        allowance: userStakeAllowances[index],
        tokenBalance: userStakeTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userStakeEarnings[index],
        withdrawFee: userFarmWithdrawFee[index] / 100,
        lastDepositTime: lastDepositTime[index],
      };
    });
  }
);

export const poolsSlice = createSlice({
  name: "Pools",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPoolsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((pool) => {
        const livePoolData = action.payload.find(
          (stakeData) => stakeData.pid === pool.pid
        );
        return { ...pool, ...livePoolData };
      });
    });

    builder.addCase(fetchPoolUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl;
        const index = state.data.findIndex((pool) => pool.pid === pid);
        state.data[index] = { ...state.data[index], userData: userDataEl };
      });
      state.userDataLoaded = true;
    });
  },
});

export default poolsSlice.reducer;
