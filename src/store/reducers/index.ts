import { combineReducers } from "redux";
import { ProjectReducer } from "./ProjectReducer";

const rootReducer = combineReducers({
    projects: ProjectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
