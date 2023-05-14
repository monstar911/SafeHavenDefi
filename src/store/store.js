import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/app-slice";
import farmsReducer from "./slices/farms-slice";
import poolsReducer from "./slices/pools-slice";
import stakeReducer from "./slices/stake-slice";
import launchpadReducer from "./slices/launchpad-slice";
import userReducer from "./slices/user-slice/reducer";
import blockReducer from './slices/block-slice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    farms: farmsReducer,
    stake: stakeReducer,
    pools: poolsReducer,
    launchpad: launchpadReducer,
    block: blockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
