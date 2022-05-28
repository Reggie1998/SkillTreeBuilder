import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

//MOVE INTERFACES SOMEWHERE APPROPRIATE
export interface SkillState {
  latestReleaseLocation: Location;
  selectedSkillId: string;
  skills: ISkill[];
}
export interface Location {
  x: number;
  y: number;
}

export interface ISkill {
  id: string;
  name?: string;
  location: Location;
  connections: string[];
  description?: string;
  stats?: Stat[];
}

export interface Stat {
  value: number;
  type: string;
}

const initialState: SkillState = {
  latestReleaseLocation: { x: 100, y: 100 },
  selectedSkillId: "1",
  skills: [
    {
      id: "1",
      location: { x: 300, y: 400 },
      connections: [],
      name: "Jump",
      description: "Jumps a short distence towards the movement direction",
      stats: [
        { type: "Int", value: 1 },
        { type: "Agi", value: 26 },
      ],
    },
    {
      id: "2",
      location: { x: 300, y: 700 },
      connections: [],
      name: "Fireball",
      description: "Launches a fireball project towards the cursor/movement direction",
      stats: [
        { type: "Str", value: 23 },
        { type: "Agi", value: 12 },
      ],
    },
  ],
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setLatestReleaseLocation: (state, action) => {
      state.latestReleaseLocation = action.payload;
    },
    setSelectedSkillId: (state, action) => {
      state.selectedSkillId = action.payload;
    },
    addSkill: (state, action) => {
      state.skills = [...state.skills, action.payload];
    },
    changeSkillLocation: (state, action) => {
      for (let i = 0; state.skills.length > i; i++) {
        if (state.skills[i].id === state.selectedSkillId) {
          state.skills[i].location = action.payload;
          break;
        }
      }
    },
    addConnection: (state, action) => {
      let included = false;
      for (let i = 0; state.skills.length > i; i++) {
        if (state.skills[i].id === state.selectedSkillId) {
          for (let a = 0; state.skills[i].connections.length > a; a++) {
            if (action.payload === state.skills[i].connections[a]) {
              included = true;
            }
          }
          if (!included) {
            state.skills[i].connections?.push(action.payload);
          }
          /*for(let i = 0; state.skills.length > 1; i++) {
                        if (state.skills[i].id === action.payload) {
                            state.skills[i].connections?.push(state.selectedSkillId);
                            break;
                        }*/
          break;
        }
      }
    },
    removeConnection: (state, action) => {
      (function () {
        for (let i = 0; state.skills.length > i; i++) {
          if (action.payload.objectId === state.skills[i].id) {
            for (let a = 0; state.skills[i].connections.length > a; a++) {
              if (state.skills[i].connections[a] === action.payload.connectionId) {
                state.skills[i].connections.splice(a, 1);
                return;
              }
            }
          }
        }
      })();
    },
    changeName: (state, action) => {
      for (let i = 0; state.skills.length > 1; i++) {
        if (state.skills[i].id === state.selectedSkillId) {
          state.skills[i].name = action.payload;
        }
      }
    },
    changeDescription: (state, action) => {
      for (let i = 0; state.skills.length > 1; i++) {
        if (state.skills[i].id === state.selectedSkillId) {
          state.skills[i].description = action.payload;
        }
      }
    },
    //Change stats todo
  },
});

export const {
  setLatestReleaseLocation,
  setSelectedSkillId,
  changeSkillLocation,
  addSkill,
  addConnection,
  removeConnection,
  changeDescription,
  changeName,
} = stateSlice.actions;

export const state = (state: any) => state.state;

export default stateSlice.reducer;
