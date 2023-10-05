import { put, call, takeEvery, all, fork } from "redux-saga/effects";



function* onLoadLyrics({ artist, song }) {
    try {
        // yield put(actionCreators.getLyricsRequest());
        // const { data } = yield call(fetchLyrics, artist, song);
        // yield put(actionCreators.getLyricsSuccess(data.lyrics));
        yield
    } catch (error) {
        // yield put(actionCreators.getLyricsFailure(error.response.data.error));
    }
}

function* watchOnLoadLyrics() {
    // yield takeEvery(, onLoadLyrics);
}

export default function* TestSaga() {
    yield all([fork(watchOnLoadLyrics)]);
}
