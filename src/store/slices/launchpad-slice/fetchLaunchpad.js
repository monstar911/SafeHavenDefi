import fetchPublicLaunchpadData from "./fetchPublicLaunchpadData";

const fetchLaunchpad = async (launchpad) => {
  const launchpadPublicData = await fetchPublicLaunchpadData(launchpad);
  return { ...launchpad, ...launchpadPublicData };
};

export default fetchLaunchpad;
