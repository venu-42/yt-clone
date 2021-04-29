import axios from "../../axios";
import * as types from "../actionTypes";

export const getHomeVideos = () => (dispatch, getState) => {
  dispatch({
    type: types.HOME_VIDEOS_REQUEST,
  });
  axios
    .get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 8,
        pageToken: getState().homeVideos.category==='All'?getState().homeVideos.nextPageToken:"",
      },
    })
    .then(({ data }) => {
    //   console.log('data.items',data.items);
        let newVideos = getState().homeVideos.category==='All'? [...getState().homeVideos.videos,...data.items]:[...data.items];
        dispatch({
          type: types.HOME_VIDEOS_SUCCESS,
          payload: {
            videos: newVideos,
            nextPageToken: data.nextPageToken,
            category: "All",
          },
        });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.HOME_VIDEOS_FAIL,
        payload: err.message,
      });
    });
};

export const getCategoryVideos = (keyword) => (dispatch, getState) => {
  dispatch({
    type: types.HOME_VIDEOS_REQUEST,
  });
  axios
    .get("/search", {
      params: {
        part: "snippet",
        type: "video",
        maxResults: 8,
        q: keyword,
        pageToken: getState().homeVideos.category===keyword?getState().homeVideos.nextPageToken:'',
      },
    })
    .then(({ data }) => {
      // console.log(data);
      let newVideos = getState().homeVideos.category===keyword? [...getState().homeVideos.videos,...data.items]:[...data.items];
      dispatch({
        type: types.HOME_VIDEOS_SUCCESS,
        payload: {
          videos: newVideos,
          nextPageToken: data.nextPageToken,
          category: keyword,
        },
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: types.HOME_VIDEOS_FAIL,
        payload: err.message,
      });
    });
};
