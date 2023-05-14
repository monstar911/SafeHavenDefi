import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useIsWindowVisible from "../../../hooks/useIsWindowVisible";
import { simpleRpcProvider } from "../../../utils/providers";
import { setBlock } from ".";

export const usePollBlockNumber = () => {
  const timer = useRef(null);
  const dispatch = useDispatch();
  const isWindowVisible = useIsWindowVisible();

  useEffect(() => {
    if (isWindowVisible) {
      timer.current = setInterval(async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber();
        dispatch(setBlock(blockNumber));
      }, 6000);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [dispatch, timer, isWindowVisible]);
};

export const useBlock = () => {
  return useSelector((state) => state.block);
};