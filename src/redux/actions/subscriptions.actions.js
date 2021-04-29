import { SUBSCRIPTION_LOADING, SUBSCRIPTION_SUCCESS } from "../actionTypes";
import axios from "../../axios";

export const getSubscriptions = () => async (dispatch, getState) => {
  dispatch({
    type: SUBSCRIPTION_LOADING,
  });
  try {
    const res = await axios.get("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        maxResults: 20,
        mine: true,
        pageToken:getState().subscriptions.pageToken
      },
      headers: {
        Authorization: `Bearer ${getState().auth.user.accessToken}`,
      },
    });
    let items= [...getState().subscriptions.body,...res.data.items];
    dispatch({
        type: SUBSCRIPTION_SUCCESS,
        payload:{
            items:items,
            nextPageToken:res.data.nextPageToken
        }
    })

  } catch (err) {
    console.log(err);
    // console.log(err.response.data.error.errors[0])
    dispatch({
        type: SUBSCRIPTION_SUCCESS,
        payload:err
    })
  }
};
