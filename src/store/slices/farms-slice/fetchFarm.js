import fetchPublicFarmData from "./fetchPublicFarmData";

const fetchFarm = async (farm) => {
  const farmPublicData = await fetchPublicFarmData(farm);
  return { ...farm, ...farmPublicData };
};

export default fetchFarm;
