import { ethers } from "ethers";
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import { getHavenTokenAddress } from "../../utils/addressHelpers";
import {
  getHavenTokenContract,
  getDividendDistributorContract,
  getSltTokenContract,
} from "../../utils/contractHelpers";
import tokenContractABI from "../../abi/tokenContract.json";

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ provider, account }) => {
    const wrappedBNBContract = new ethers.Contract(
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      tokenContractABI,
      provider
    );
    const BUSDContract = new ethers.Contract(
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      tokenContractABI,
      provider
    );
    const havenContract = getHavenTokenContract(provider);
    const dividendDistributorContract =
      getDividendDistributorContract(provider);
    const sltTokenContract = getSltTokenContract(provider);

    let userBalanceOfHAVEN= 0;
    let userBalanceOfSLT = 0;
    if(account) {
      userBalanceOfHAVEN =
      parseFloat(await havenContract.balanceOf(
        account
      ));

      userBalanceOfSLT =
      parseFloat(await havenContract.balanceOf(
        account
      ));
    }
    const WBNBbalanceOfLP =
      (await wrappedBNBContract.balanceOf(
        "0x63373252f5090B3CEE061348D627A17cf6Ab360F"
      )) / Math.pow(10, 18);
    const HavenBalanceOfLP =
      (await havenContract.balanceOf(
        "0x63373252f5090B3CEE061348D627A17cf6Ab360F"
      )) / Math.pow(10, 9);
    const circulatingSupply =
      (await havenContract.getCirculatingSupply()) / Math.pow(10, 9);
    const slttotalSupply =
      (await sltTokenContract.totalSupply()) / Math.pow(10, 18);
    const priceOfSLTInBNB =
      (await wrappedBNBContract.balanceOf(
        "0x2d823FcB0a3Fd67a2c631EDD251B5173c1917A49"
      )) /
      (await sltTokenContract.balanceOf(
        "0x2d823FcB0a3Fd67a2c631EDD251B5173c1917A49"
      ));
    const priceOfCoinInBNB = WBNBbalanceOfLP / HavenBalanceOfLP;
    const priceOfBNB =
      (await BUSDContract.balanceOf(
        "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"
      )) /
      (await wrappedBNBContract.balanceOf(
        "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"
      ));
    let priceOfOneHaven = priceOfBNB * priceOfCoinInBNB;
    let priceOfOneSLT = priceOfBNB * priceOfSLTInBNB;
    if (isNaN(priceOfOneHaven) === true) {
      priceOfOneHaven = 0.0;
    }
    if (isNaN(priceOfOneSLT) === true) {
      priceOfOneSLT = 0.0;
    }
    let marketCap = circulatingSupply * priceOfOneHaven;
    let sltmarketCap = slttotalSupply * priceOfOneSLT;
    const liquidityPoolInDollars = priceOfBNB * (WBNBbalanceOfLP * 2);
    let balanceOfUser = 0;
    if (account) {
      balanceOfUser =
        ethers.utils.formatEther(await havenContract.balanceOf(account)) *
        1000000000;
    }
    const totalBNBFee = parseInt(await havenContract.getTotalFee(true));
    let unpaidEarnings = 0;
    if (account) {
      unpaidEarnings = ethers.utils.formatEther(
        await dividendDistributorContract.getUnpaidEarnings(account)
      );
    }
    const buyTaxFee = parseInt(await havenContract.getTotalFee(false));
    let totalRealised = 0;
    if (account) {
      totalRealised = ethers.utils.formatEther(
        (await dividendDistributorContract.shares(account)).totalRealised
      );
    }
    const burntTokens =
      (await havenContract.balanceOf(
        "0x000000000000000000000000000000000000dead"
      )) / Math.pow(10, 9);
    const taxSaleInPercentage = totalBNBFee / 100;
    const buyTaxInPercentage = buyTaxFee / 100;
    const totalDistributed =
      (await dividendDistributorContract.totalDistributed()) / Math.pow(10, 18);
    const balanceOfContract =
      (await provider.getBalance(getHavenTokenAddress())) / Math.pow(10, 18);
    return {
      userBalanceOfHAVEN,
      userBalanceOfSLT,
      priceOfBNB,
      priceOfOneHaven,
      priceOfOneSLT,
      sltmarketCap,
      marketCap,
      liquidityPoolInDollars,
      circulatingSupply,
      balanceOfUser,
      totalRealised,
      unpaidEarnings,
      taxSaleInPercentage,
      buyTaxInPercentage,
      burntTokens,
      totalDistributed,
      balanceOfContract,
      slttotalSupply,
    };
  }
);

export const changeDrawer = createAction("lists/changeDrawer");

const initialState = {
  loading: true,
  isDrawerSmall: false,
};

const setAll = (state, properties) => {
  const props = Object.keys(properties);
  props.forEach((key) => {
    state[key] = properties[key];
  });
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(changeDrawer, (state, action) => {
        state.isDrawerSmall = action.payload;
      });
  },
});

const baseInfo = (state) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, (app) => app);
