import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";

const rootReducer = combineReducers({ tabReducer });

export default rootReducer;
