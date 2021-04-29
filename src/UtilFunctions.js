import axios from "./axios";
import { ADD_SUBSCRIPTION } from "./redux/actionTypes";
import store from "./redux/store";

export const getChannelDetails = (channelId) => {
    
};

export const isSubscribedFn = (channelId) => {
  return new Promise((res, rej) => {
    axios
      .get("/subscriptions", {
        params: {
          mine: true,
          forChannelId: channelId,
        },
        headers:{
          Authorization: "Bearer " +store.getState().auth.user.accessToken
        }
      })
      .then((response) => {
        store.dispatch({
          type:ADD_SUBSCRIPTION,
          payload:response.data.items[0]?response.data.items[0].id:null
        })
        res(response);
      });
  });
};

export const Subscribe = (channelId) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/subscriptions", {
          snippet: {
            resourceId: {
              kind: "youtube#channel",
              channelId: channelId,
            },
          },
        },
        {
          params:{
            part:'snippet'
          },
          headers:{
            Authorization: "Bearer " + store.getState().auth.user.accessToken
          }
        }
      )
      .then((response) => {
        store.dispatch({
          type:ADD_SUBSCRIPTION,
          payload:response.data.id
        })
        resolve(response);
      })
      .catch(err=>console.log(err.response));
  });
};

export const Unsubscribe = async () => {
  try{
    const res= await axios.delete("/subscriptions",{
      params:{
        id:store.getState().watch.subscriptionId
      },
      headers:{
        Authorization: "Bearer " + store.getState().auth.user.accessToken
      }
    })
    store.dispatch({
      type:ADD_SUBSCRIPTION,
      payload:null
    })
    return res;
  }
  catch(err)
  {
    console.log(err.response)
    return Promise.reject(err);
  }
}