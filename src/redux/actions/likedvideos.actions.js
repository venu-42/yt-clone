import { LIKED_VIDEOS_LOADING, LIKED_VIDEOS_SUCCESS } from "../actionTypes";
import axios from "../../axios";

export const getLikedvieos = () => async (dispatch,getState) => {
  dispatch({
    type: LIKED_VIDEOS_LOADING,
  });
  try {
    const res = await axios.get("/videos", {
      params: {
        chart:'mostPopular',
        // myRating: "like",
        maxResults: 50,
        nextPageToken:getState().likedVideos.nextPageToken,
        part:'snippet'
      },
    //   headers: {
    //     Authorization: `Bearer ${
    //       JSON.parse(localStorage.getItem("ytc-user"))?.accessToken
    //     }`,
    //   },
    });
    console.log(res);
    let items=res.data.items;
    if(getState().likedVideos.body?.length){
        items=[...getState().likedVideos.body,...items];
    }
    dispatch({
        type:LIKED_VIDEOS_SUCCESS,
        payload:{
            items,
            nextPageToken:res.data.nextPageToken,
        }
    })
  }
  catch(err){
      console.log(err.response);
  }
};
