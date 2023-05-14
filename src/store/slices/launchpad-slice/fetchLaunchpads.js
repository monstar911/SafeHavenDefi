import fetchLaunchpad from "./fetchLaunchpad";

const fetchLaunchpads = async (launchpadToFetch) => {
  const data = await Promise.all(
    launchpadToFetch.map(async (launchpadConfig) => {
      const launchpad = await fetchLaunchpad(launchpadConfig);
      const serializedLaunchpad = { ...launchpad };
      return serializedLaunchpad;
    })
  );
  return data;
};

export default fetchLaunchpads;
