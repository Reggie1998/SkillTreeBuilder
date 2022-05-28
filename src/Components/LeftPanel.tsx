import React, { useState } from "react";
import "../Components/LeftPanel.scss";
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
  changeName,
  changeDescription,
  importState,
} from "../State/StateSlice";

interface LeftPanelProps {}

const LeftPanel = (props: LeftPanelProps) => {
  const skillState: SkillState = useSelector(state);
  const dispatch = useDispatch();

  const getSelectedSkill = () => {
    return skillState.skills.find((obj) => obj.id === skillState.selectedSkillId);
  };
  let selectedSkill = getSelectedSkill();

  let name: string | undefined = selectedSkill?.name ? selectedSkill?.name : undefined;
  let description: string | undefined = selectedSkill?.description ? selectedSkill?.description : undefined;

  return (
    <div className="left-panel">
      <div>
        Name: <input value={name} />
      </div>
      <div>
        Description:{" "}
        <textarea
          onChange={(e) => {
            console.log(e);
          }}
          style={{ width: "200px", height: "200px" }}
          value={description}
        />
      </div>
      <div>
        Stats required:{" "}
        {selectedSkill?.stats
          ? selectedSkill.stats.map((obj) => (
              <div>
                {obj.type} : {obj.value}
              </div>
            ))
          : undefined}
      </div>
      <button
        onClick={() => {
          dispatch(changeName(name));
          dispatch(changeDescription(description));
        }}>
        Update skill
      </button>
      <button onClick={() => navigator.clipboard.writeText(JSON.stringify(skillState))}>clipboard current JSON</button>
      <textarea style={{ width: "200px", height: "200px", maxHeight: "250px" }}></textarea>
      <button onClick={() => navigator.clipboard.readText().then((result) => dispatch(importState(JSON.parse(result))))}>Import state</button>
    </div>
  );
};

export default LeftPanel;
