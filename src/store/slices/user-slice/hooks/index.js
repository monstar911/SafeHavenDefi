import { ChainId } from "@pancakeswap/sdk";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_CHAINID } from "../../../../constants";
import {
  FarmStakedOnly,
  updateUserFarmStakedOnly,
  updateUserStakeStakedOnly,
  updateUserPoolStakedOnly,
  updateUserPoolsViewMode,
  updateUserFarmsViewMode,
  updateUserStakesViewMode,
  toggleTheme as toggleThemeAction,
} from "../actions";
import { GAS_PRICE_GWEI } from "./helpers";

export function useUserFarmStakedOnly(isActive) {
  const dispatch = useDispatch();
  const userFarmStakedOnly = useSelector((state) => {
    return state.user.userFarmStakedOnly;
  });

  const setUserFarmStakedOnly = useCallback(
    (stakedOnly) => {
      const farmStakedOnly = stakedOnly
        ? FarmStakedOnly.TRUE
        : FarmStakedOnly.FALSE;
      dispatch(
        updateUserFarmStakedOnly({ userFarmStakedOnly: farmStakedOnly })
      );
    },
    [dispatch]
  );

  return [
    userFarmStakedOnly === FarmStakedOnly.ON_FINISHED
      ? !isActive
      : userFarmStakedOnly === FarmStakedOnly.TRUE,
    setUserFarmStakedOnly,
  ];
}

export function useUserPoolStakedOnly() {
  const dispatch = useDispatch();
  const userPoolStakedOnly = useSelector((state) => {
    return state.user.userPoolStakedOnly;
  });

  const setUserPoolStakedOnly = useCallback(
    (stakedOnly) => {
      dispatch(updateUserPoolStakedOnly({ userPoolStakedOnly: stakedOnly }));
    },
    [dispatch]
  );

  return [userPoolStakedOnly, setUserPoolStakedOnly];
}

export function useUserStakeStakedOnly() {
  const dispatch = useDispatch();
  const userStakeStakedOnly = useSelector((state) => {
    return state.user.userStakeStakedOnly;
  });

  const setUserStakeStakedOnly = useCallback(
    (stakedOnly) => {
      dispatch(updateUserStakeStakedOnly({ userStakeStakedOnly: stakedOnly }));
    },
    [dispatch]
  );

  return [userStakeStakedOnly, setUserStakeStakedOnly];
}

export function useUserPoolsViewMode() {
  const dispatch = useDispatch();
  const userPoolsViewMode = useSelector((state) => {
    return state.user.userPoolsViewMode;
  });

  const setUserPoolsViewMode = useCallback(
    (viewMode) => {
      dispatch(updateUserPoolsViewMode({ userPoolsViewMode: viewMode }));
    },
    [dispatch]
  );

  return [userPoolsViewMode, setUserPoolsViewMode];
}

export function useUserFarmsViewMode() {
  const dispatch = useDispatch();
  const userFarmsViewMode = useSelector((state) => {
    return state.user.userFarmsViewMode;
  });

  const setUserFarmsViewMode = useCallback(
    (viewMode) => {
      dispatch(updateUserFarmsViewMode({ userFarmsViewMode: viewMode }));
    },
    [dispatch]
  );

  return [userFarmsViewMode, setUserFarmsViewMode];
}

export function useUserStakesViewMode() {
  const dispatch = useDispatch();
  const userStakesViewMode = useSelector((state) => {
    return state.user.userStakesViewMode;
  });

  const setUserStakesViewMode = useCallback(
    (viewMode) => {
      dispatch(updateUserStakesViewMode({ userStakesViewMode: viewMode }));
    },
    [dispatch]
  );

  return [userStakesViewMode, setUserStakesViewMode];
}

export function useGasPrice() {
  const chainId = DEFAULT_CHAINID;
  const userGas = useSelector((state) => state.user.gasPrice);
  return chainId === ChainId.MAINNET ? userGas : GAS_PRICE_GWEI.testnet;
}

export function useThemeManager() {
  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.user.isDark)

  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction())
  }, [dispatch])

  return [isDark, toggleTheme]
}