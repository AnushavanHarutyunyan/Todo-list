import { all, fork } from "redux-saga/effects";
import TestSaga from "./TestSaga";

export default function* rootSaga() {
    yield all([fork(TestSaga)]);
}
