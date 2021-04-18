import axios from "./axios";

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
      })
      .then((response) => {
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
      )
      .then((response) => {
        resolve(response);
      })
      .catch(err=>console.log(err.response));
  });
};
