import axios from "../../axios";
import { SEARCH_FAIL, SEARCH_LOADING, SEARCH_SUCCESS } from "../actionTypes";

export const search = (keyword) => async (dispatch, getState) => {
  dispatch({
    type: SEARCH_LOADING,
  });
  await setTimeout(() => {},2000)
  const keywordChanged = getState().search.keyword===keyword
  try {
    const res = await axios.get("/search", {
      params: {
        q: keyword,
        part: "snippet",
        maxResults: 5,
        pageToken: keywordChanged?getState().search.nextPageToken:'',
      },
    });
    console.log(res,'search action');
    let items=res.data.items;
    if(keywordChanged){
      items=[...getState().search.body,...items];
    }
    dispatch({
        type:SEARCH_SUCCESS,
        payload:{
            items:items,
            nextPageToken:res.data.nextPageToken,
            keyword
        }
    })
  }
  catch(err){
      console.log(err);
      console.log(err.response);
      dispatch({
          type:SEARCH_FAIL,
          payload:{
            error:err.response,
            keyword
          }
      })
  }
};
