import fetchPublicStakeData from "./fetchPublicPoolData";

const fetchPool = async (stake) => {
  const stakePublicData = await fetchPublicStakeData(stake);
  return { ...stake, ...stakePublicData };
};

export default fetchPool;
