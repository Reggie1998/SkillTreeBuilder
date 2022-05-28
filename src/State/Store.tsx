import React, { useState } from "react";

interface AppContextInterface {
  latestReleaseLocation?: Location;
  setLatestReleaseLocation: (releaseLocation: Location) => void;
  selectedSkillId?: string;
  setSelectedSkillId: (id: string) => void;
}

export interface Location {
  x: number;
  y: number;
}

export const AppCtx = React.createContext<AppContextInterface>({
  setLatestReleaseLocation: () => {},
  setSelectedSkillId: () => {},
});

export const ContextProvider = (props: any) => {
  const setLatestReleaseLocation = (releaseLocation: Location) => {
    setSate({ ...state, latestReleaseLocation: releaseLocation });
  };

  const setSelectedSkillId = (id: string) => {
    setSate({ ...state, selectedSkillId: id });
  };

  const initState = {
    setLatestReleaseLocation: setLatestReleaseLocation,
    setSelectedSkillId: setSelectedSkillId,
  };

  const [state, setSate] = useState<AppContextInterface>(initState);

  return <AppCtx.Provider value={state}>{props.children}</AppCtx.Provider>;
};
