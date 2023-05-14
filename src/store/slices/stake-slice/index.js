import { createSlice } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import stakesConfig from "../../../constants/stake";
import { getPoolApr } from "../../../utils/apr";
import { getBalanceNumber } from "../../../utils/formatBalance";
import { fetchStakesBlockLimits, fetchStakesTotalStaking } from "./fetchStakes";
import {
  fetchStakesAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  fetchUserWithdrawFee,
} from "./fetchStakeUser";
import { getTokenPricesFromFarm } from "./helpers";

const initialState = {
  data: [...stakesConfig],
  userDataLoaded: false,
};

export const fetchStakesPublicDataAsync =
  (currentBlock) => async (dispatch, getState) => {
    const blockLimits = await fetchStakesBlockLimits();
    const totalStakings = await fetchStakesTotalStaking();

    const prices = getTokenPricesFromFarm(getState().farms.data);

    const liveData = stakesConfig.map((stake) => {
      const blockLimit = blockLimits.find(
        (entry) => entry.sousId === stake.sousId
      );
      const totalStaking = totalStakings.find(
        (entry) => entry.sousId === stake.sousId
      );
      const isStakeEndBlockExceeded = currentBlock > 0 && blockLimit ? currentBlock > Number(blockLimit.endBlock) : false
      const isStakeFinished = stake.isFinished || isStakeEndBlockExceeded

      const stakingTokenAddress = stake.stakingToken.address
        ? stake.stakingToken.address.toLowerCase()
        : null;
      const stakingTokenPrice = stakingTokenAddress
        ? prices[stakingTokenAddress]
        : 0;

      const earningTokenAddress = stake.earningToken.address
        ? stake.earningToken.address.toLowerCase()
        : null;
      const earningTokenPrice = earningTokenAddress
        ? prices[earningTokenAddress]
        : 0;
      const apr = getPoolApr(
        stakingTokenPrice,
        earningTokenPrice,
        getBalanceNumber(
          new BigNumber(totalStaking.totalStaked),
          stake.stakingToken.decimals
        ),
        parseFloat(blockLimit.rewardTokenPerBlock)
      );
      return {
        ...blockLimit,
        ...totalStaking,
        stakingTokenPrice,
        earningTokenPrice,
        apr,
        isFinished: isStakeFinished,
      };
    });

    dispatch(setStakesPublicData(liveData));
  };

export const fetchStakesUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchStakesAllowance(account);
  const stakingTokenBalances = await fetchUserBalances(account);
  const stakedBalances = await fetchUserStakeBalances(account);
  const pendingRewards = await fetchUserPendingRewards(account);
  const withdrawFee = await fetchUserWithdrawFee(account);

  const userData = stakesConfig.map((stake) => ({
    sousId: stake.sousId,
    allowance: allowances[stake.sousId],
    stakingTokenBalance: stakingTokenBalances[stake.sousId],
    stakedBalance: stakedBalances[stake.sousId],
    pendingReward: pendingRewards[stake.sousId],
    withdrawFee: withdrawFee[stake.sousId],
  }));

  dispatch(setStakesUserData(userData));
};

export const updateUserAllowance = (sousId, account) => async (dispatch) => {
  const allowances = await fetchStakesAllowance(account);
  dispatch(
    updateStakesUserData({
      sousId,
      field: "allowance",
      value: allowances[sousId],
    })
  );
};

export const updateUserBalance = (sousId, account) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account);
  dispatch(
    updateStakesUserData({
      sousId,
      field: "stakingTokenBalance",
      value: tokenBalances[sousId],
    })
  );
};

export const updateUserStakedBalance =
  (sousId, account) => async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(account);
    dispatch(
      updateStakesUserData({
        sousId,
        field: "stakedBalance",
        value: stakedBalances[sousId],
      })
    );
  };

export const updateUserPendingReward =
  (sousId, account) => async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(account);
    dispatch(
      updateStakesUserData({
        sousId,
        field: "pendingReward",
        value: pendingRewards[sousId],
      })
    );
  };

export const StakesSlice = createSlice({
  name: "Stakes",
  initialState,
  reducers: {
    setStakesPublicData: (state, action) => {
      const liveStakesData = action.payload;
      state.data = state.data.map((stake) => {
        const liveStakeData = liveStakesData.find(
          (entry) => entry.sousId === stake.sousId
        );
        return { ...stake, ...liveStakeData };
      });
    },
    setStakesUserData: (state, action) => {
      const userData = action.payload;
      state.data = state.data.map((stake) => {
        const userStakeData = userData.find(
          (entry) => entry.sousId === stake.sousId
        );
        return { ...stake, userData: userStakeData };
      });
      state.userDataLoaded = true;
    },
    updateStakesUserData: (state, action) => {
      const { field, value, sousId } = action.payload;
      const index = state.data.findIndex((p) => p.sousId === sousId);

      if (index >= 0) {
        state.data[index] = {
          ...state.data[index],
          userData: { ...state.data[index].userData, [field]: value },
        };
      }
    },
  },
});

export const { setStakesPublicData, setStakesUserData, updateStakesUserData } =
  StakesSlice.actions;

export default StakesSlice.reducer;
