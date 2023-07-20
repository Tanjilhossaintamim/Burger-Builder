import { legacy_createStore, applyMiddleware } from "redux";
import Reducer from "./Reducer";
import thunk from "redux-thunk";

const ReduxStore = legacy_createStore(Reducer, applyMiddleware(thunk));

export default ReduxStore;
