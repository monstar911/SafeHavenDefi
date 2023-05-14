import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import farmsConfig from "../../../constants/farms";
import fetchFarms from "./fetchFarms";
import fetchFarmsPrices from "./fetchFarmsPrices";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "../../../utils/bigNumber";
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
  fetchFarmWithdrawFee,
  fetchFarmUserLastDepositTime,
} from "./fetchFarmUser";
import fetchFarmsBlockNumber from "./fetchFarmsBlockNumber";
import { getPoolApr } from "../../../utils/apr";

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: "0",
    tokenBalance: "0",
    stakedBalance: "0",
    earnings: "0",
  },
  blockNumber: {
    startBlockNumber: 0,
    endBlockNumber: 0,
  },
}));

const initialState = {
  data: noAccountFarmConfig,
  userDataLoaded: false,
};

export const fetchFarmsPublicDataAsync = createAsyncThunk(
  "farms/fetchFarmsPublicDataAsync",
  async (pids) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) =>
      pids.includes(farmConfig.pid)
    );

    const farms = await fetchFarms(farmsToFetch);
    const farmsWithPrices = await fetchFarmsPrices(farms);
    const sltToken = farmsWithPrices.filter((farm) => farm.pid === 0);
    const sltTokenPrice = sltToken[0].tokenPriceBusd;
    const farmsWithApr = farmsWithPrices.map((farm) => {
      const totalLiquidity =
        new BigNumber(farm.lpTotalInQuoteToken).times(
          farm.quoteTokenPriceBusd
        ) || BIG_ZERO;
      const apr = getPoolApr(
        farm.lpTotalSupply === "0"
          ? new BigNumber(10 ** 100)
          : new BigNumber(farm.tokenPriceBusd)
              .times(new BigNumber(farm.tokenAmountTotal))
              .times(new BigNumber(2))
              .div(new BigNumber(farm.lpTotalSupply)),
        new BigNumber(sltTokenPrice),
        farm.lpTokenRatio,
        new BigNumber(farm.earningsPerBlock)
      );
      return { ...farm, liquidity: totalLiquidity, apr };
    });

    const farmsWithoutHelperLps = farmsWithApr.filter((farm) => {
      return farm.pid || farm.pid === 0;
    });
    return farmsWithoutHelperLps;
  }
);

export const fetchFarmUserDataAsync = createAsyncThunk(
  "farms/fetchFarmUserDataAsync",
  async ({ account, pids }) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) =>
      pids.includes(farmConfig.pid)
    );
    const userFarmAllowances = await fetchFarmUserAllowances(
      account,
      farmsToFetch
    );
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(
      account,
      farmsToFetch
    );
    const userStakedBalances = await fetchFarmUserStakedBalances(
      account,
      farmsToFetch
    );
    const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch);
    const userFarmWithdrawFee = await fetchFarmWithdrawFee(
      account,
      farmsToFetch
    );
    const lastDepositTime = await fetchFarmUserLastDepositTime(
      account,
      farmsToFetch
    );
    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsToFetch[index].pid,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
        withdrawFee: userFarmWithdrawFee[index] / 100,
        lastDepositTime: lastDepositTime[index],
      };
    });
  }
);

export const fetchFarmsBlockNumberDataAsync = createAsyncThunk(
  "farms/fetchFarmsBlockNumberDataAsync",
  async () => {
    const blockNumber = await fetchFarmsBlockNumber();
    return {
      startBlockNumber: blockNumber.startBlockNumber,
      endBlockNumber: blockNumber.endBlockNumber,
    };
  }
);

export const farmsSlice = createSlice({
  name: "Farms",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((farm) => {
        const liveFarmData = action.payload.find(
          (farmData) => farmData.pid === farm.pid
        );
        return { ...farm, ...liveFarmData };
      });
    });

    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl;
        const index = state.data.findIndex((farm) => farm.pid === pid);
        state.data[index] = { ...state.data[index], userData: userDataEl };
      });
      state.userDataLoaded = true;
    });

    builder.addCase(
      fetchFarmsBlockNumberDataAsync.fulfilled,
      (state, action) => {
        state.blockNumber = action.payload;
      }
    );
  },
});

export default farmsSlice.reducer;
