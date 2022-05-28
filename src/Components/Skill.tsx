import React, { useEffect } from "react";
import "../Components/Skill.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSkillId, state, SkillState, changeSkillLocation, ISkill, addConnection } from "../State/StateSlice";
import { useXarrow } from "react-xarrows";
//@ts-ignore
import Background from "../Images/sphere.png";

interface SkillProps {
  location: Location;
  id: string;
  name?: string;
  description?: string;
}

interface Location {
  x: number;
  y: number;
}

const Skill = (props: SkillProps) => {
  //STATE HERE
  const dispatch = useDispatch();
  const skillState: SkillState = useSelector(state);

  //STATE HERE

  const updateArrow = useXarrow();

  let componentRef: HTMLDivElement | null;

  useEffect(() => {
    changeStylingProperty(componentRef, "--border-color", skillState.selectedSkillId === props.id ? "blue" : "red");
  }, [skillState.selectedSkillId]);

  useEffect(() => {
    componentRef?.addEventListener("dragstart", dragStart, true);
    componentRef?.addEventListener("dragend", dragEnd, true);
    componentRef?.addEventListener("dragover", dragOver, true);
  }, []);

  const dragStart = (event: any) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.dropEffect = "move";
    if (componentRef) {
      componentRef.style.cursor = "pointer";
    }
  };

  const dragOver = (event: any) => {
    event.dataTransfer.dropEffect = "pointer";
    event.preventDefault();
  };

  const dragEnd = (event: any) => {
    if (skillState.selectedSkillId) {
      updateArrow();
      dispatch(changeSkillLocation({ x: Math.round(event.pageX / 25) * 25, y: Math.round(event.pageY / 25) * 25 }));
    }
  };

  useEffect(() => {
    changeStylingProperty(componentRef, "--left", (props.location?.x - 50).toString() + "px");
    changeStylingProperty(componentRef, "--top", (props.location?.y - 50).toString() + "px");
  }, [props.location]);

  const changeStylingProperty = (objectRef: any, property: string, color: string) => {
    objectRef?.style?.setProperty(property, color);
  };

  const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.altKey ? dispatch(addConnection(props.id)) : dispatch(setSelectedSkillId(props.id));
  };

  const mouseUpHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};

  return (
    <div
      draggable={"true"}
      ref={(c) => (componentRef = c)}
      onMouseDown={(e) => mouseDownHandler(e)}
      onMouseUp={(e) => mouseUpHandler(e)}
      className={"skill"}>
      <div className="centered" id={props.id}></div>
      <div className="hover-description">
        <div>{props.name}</div>
        <div>{props.description}</div>
      </div>
    </div>
  );
};

export default Skill;
