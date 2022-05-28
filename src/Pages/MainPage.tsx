import React, { useContext } from "react";
import Skill from "../Components/Skill";
import { useEffect } from "react";
import "../Pages/MainPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  state,
  setLatestReleaseLocation,
  changeSkillLocation,
  addSkill,
  SkillState,
  ISkill,
  addConnection,
  removeConnection,
} from "../State/StateSlice";
import Xarrow, { Xwrapper } from "react-xarrows";
import LeftPanel from "../Components/LeftPanel";

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  let mainPageRef;

  useEffect(() => {}, []);

  //const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

  //const mouseUpHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

  const skillState: SkillState = useSelector(state);
  const dispatch = useDispatch();

  const getLineStartingLocation = (): React.CSSProperties => {
    return { position: "absolute", top: skillState.skills[0]?.location.y, left: skillState.skills[0]?.location.x };
  };
  console.log(skillState.skills);
  return (
    <div className={"main-page"} ref={(c) => (mainPageRef = c)}>
      <>{skillState.selectedSkillId}</>
      <button
        onClick={() => {
          dispatch(addSkill({ id: Math.floor(Math.random() * 99).toString(), name: "random2222", location: { x: 200, y: 100 }, connections: [] }));
        }}>
        Add Skill
      </button>
      <button onClick={() => console.log()}>Json</button>
      ALT + LEFT CLICK TO ADD CONNECTION
      <Xwrapper>
        {skillState.skills.map((obj: ISkill) => (
          <>
            {obj.connections?.map((line, i) => (
              <Xarrow
                arrowBodyProps={{
                  onClick: () => {
                    dispatch(removeConnection({ objectId: obj.id, connectionId: line }));
                  },
                  cursor: "pointer",
                }}
                key={i}
                strokeWidth={5}
                zIndex={1}
                showHead={false}
                path={"straight"}
                start={obj.id}
                end={line}
              />
            ))}
            <Skill key={obj.id} id={obj.id} location={obj.location} name={obj.name} description={obj.description}></Skill>
          </>
        ))}
      </Xwrapper>
      <LeftPanel></LeftPanel>
    </div>
  );
};

export default MainPage;
