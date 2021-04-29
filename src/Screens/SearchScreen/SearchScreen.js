import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import InfiniteCustomScroll from "../../components/InfiniteScroll/InfiniteScroll";
import { search } from "../../redux/actions/search.actions";

const data = [
  {
    kind: "youtube#searchResult",
    etag: "jpMHPi6uad096S_9snC9nLjI_2I",
    id: {
      kind: "youtube#channel",
      channelId: "UCsEMQbMruJjM4z6C9xFUbsA",
    },
    snippet: {
      publishedAt: "2013-07-17T14:16:32Z",
      channelId: "UCsEMQbMruJjM4z6C9xFUbsA",
      title: "String",
      description:
        'There is a dire need for unity among people who are Pro-Nation. "STRING" is about establishing a network among individuals who are working towards uplifting ...',
      thumbnails: {
        default: {
          url:
            "https://yt3.ggpht.com/ytc/AAUvwnjwocnspt9qkgxP8fnjySCpOtcwCoEFmU3Yd-Uq=s88-c-k-c0xffffffff-no-rj-mo",
        },
        medium: {
          url:
            "https://yt3.ggpht.com/ytc/AAUvwnjwocnspt9qkgxP8fnjySCpOtcwCoEFmU3Yd-Uq=s240-c-k-c0xffffffff-no-rj-mo",
        },
        high: {
          url:
            "https://yt3.ggpht.com/ytc/AAUvwnjwocnspt9qkgxP8fnjySCpOtcwCoEFmU3Yd-Uq=s800-c-k-c0xffffffff-no-rj-mo",
        },
      },
      channelTitle: "String",
      liveBroadcastContent: "none",
      publishTime: "2013-07-17T14:16:32Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "XGO8E2h5jh14T-f7HwZA4KW9IGo",
    id: {
      kind: "youtube#video",
      videoId: "zAma9P261RM",
    },
    snippet: {
      publishedAt: "2021-04-18T11:23:38Z",
      channelId: "UCsEMQbMruJjM4z6C9xFUbsA",
      title: "Why Sadhguru Never Declares Himself a Hindu? [Answered] Part 3/3",
      description:
        "DISCLAIMER: The views presented in the video are personal. I neither intend to blame anyone nor does anyone need to agree with this. Video doesn't intend to ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/zAma9P261RM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/zAma9P261RM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/zAma9P261RM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "String",
      liveBroadcastContent: "none",
      publishTime: "2021-04-18T11:23:38Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "wjfgm74SLnJ0gZt24KRQR1w-qI4",
    id: {
      kind: "youtube#video",
      videoId: "eCWowkNE1dI",
    },
    snippet: {
      publishedAt: "2021-04-18T11:00:17Z",
      channelId: "UCsEMQbMruJjM4z6C9xFUbsA",
      title: "Don&#39;t Fall Into The Trap Of Trads | Part 1/3",
      description:
        "DISCLAIMER: The views presented in the video are personal. I neither intend to blame anyone nor does anyone need to agree with this. Video doesn't intend to ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/eCWowkNE1dI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/eCWowkNE1dI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/eCWowkNE1dI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "String",
      liveBroadcastContent: "none",
      publishTime: "2021-04-18T11:00:17Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "jULc1Kl2JIV-oUD7DsynCYy769w",
    id: {
      kind: "youtube#video",
      videoId: "sR-nOJsr5fw",
    },
    snippet: {
      publishedAt: "2021-03-08T11:00:19Z",
      channelId: "UCsEMQbMruJjM4z6C9xFUbsA",
      title: "What is 900 divided by 3? [A Nightmare to Liberandus]",
      description:
        "DISCLAIMER: The views presented in the video are personal. I neither intend to blame anyone nor does anyone need to agree with this. Video doesn't intend to ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/sR-nOJsr5fw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/sR-nOJsr5fw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/sR-nOJsr5fw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "String",
      liveBroadcastContent: "none",
      publishTime: "2021-03-08T11:00:19Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "QB926sDPS3mblXiHAwXmHK1EaGo",
    id: {
      kind: "youtube#video",
      videoId: "aFwi510AZr8",
    },
    snippet: {
      publishedAt: "2021-02-19T08:00:16Z",
      channelId: "UCs0kMbzhUYV2lhIV7xoWhoA",
      title: "Dhruv Rathee Vs String Video | Who Exposed Who?",
      description:
        'First, String made a video "exposing" Dhruv Rathee, and then Dhruv Rathee and Akash Banerjee made videos "exposing" String. Who exposed who? Who is ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/aFwi510AZr8/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/aFwi510AZr8/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/aFwi510AZr8/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "The Sham Sharma Show",
      liveBroadcastContent: "none",
      publishTime: "2021-02-19T08:00:16Z",
    },
  },
];

const SearchScreen = ({ match }) => {
  const {
    params: { keyword },
  } = match;

  const dispatch = useDispatch();
  const searchObj = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(search(keyword));
  }, [keyword]);

  if (searchObj.body?.length)
    return (
      <InfiniteCustomScroll
        length={searchObj.body.length}
        fetchData={() => {
          dispatch(search(keyword));
        }}
        hasMore={searchObj.body.length < 15}
      >
        {searchObj.body.map((item) => {
          if (item.id.kind === "youtube#channel")
            return <ChannelSearch item={item} key={item.id.channelId} />;
          else if (item.id.kind === "youtube#video") {
            return <VideoSearch item={item} key={item.id.videoId} />;
          } else return <></>;
        })}
      </InfiniteCustomScroll>
    );

  return <></>;

  //testing

  //   return (
  //     <>
  //       <ChannelSearch item={channelData} />
  //       <VideoSearch item={VideoData} />
  //     </>
  //   );

  // if(data?.length)
  //   return (
  //     <InfiniteCustomScroll length={data.length} fetchData={()=>{}} hasMore={data.length<15} >
  //       {data.map(item=>{
  //           if(item.id.kind==='youtube#channel')
  //           return <ChannelSearch item={item} key={item.id.channelId} />
  //           else if(item.id.kind==='youtube#video'){
  //               return <VideoSearch item={item}  key={item.id.videoId} />
  //           }
  //           else return <></>
  //       })}
  //     </InfiniteCustomScroll>
  //   );
};

export default SearchScreen;

export const ChannelSearch = ({ item, type }) => {
  // console.log(item);
  const history = useHistory();

  if (type === "subscription") {
    const {
      snippet: {
        title,
        description,
        resourceId: { channelId },
        thumbnails,
      },
    } = item;

    
    const clickHandler = () => {
      history.push(`/channel/${channelId}`);
    };


    return (
      <div className="w-100 search">
        <div className="search__left">
          <img
            src={thumbnails.high.url}
            alt="channel medium img"
            className="channel__medium__img cursor-pointer"
            onClick={clickHandler}
          />
        </div>
        <div className="search__right">
          <h3 className="search__title cursor-pointer" onClick={clickHandler}>
            {title}
          </h3>
          <p className="search__description">{description}</p>
          <p>650K subscribers &nbsp; 50 videos</p>
        </div>
      </div>
    );
  }

  const {
    snippet: {
      thumbnails,
      publishedAt,
      channelId,
      title,
      description,
      channelTitle,
    },
  } = item;

  
  const clickHandler = () => {
    history.push(`/channel/${channelId}`);
  };


  return (
    <div className="w-100 search">
      <div className="search__left">
        <img
          src={thumbnails.high.url}
          alt="channel medium img"
          className="channel__medium__img cursor-pointer"
          onClick={clickHandler}
        />
      </div>
      <div className="search__right">
        <h3 className="search__title cursor-pointer" onClick={clickHandler}>
          {title}
        </h3>
        <p className="search__description">{description}</p>
        <p>650K subscribers &nbsp; 50 videos</p>
      </div>
    </div>
  );
};

const VideoSearch = ({ item }) => {
  const {
    snippet: {
      thumbnails,
      publishedAt,
      channelId,
      title,
      description,
      channelTitle,
    },
    id: { videoId },
  } = item;
  const history = useHistory();
  return (
    <div
      className="w-100 search"
      onClick={() => {
        history.push(`/watch/${videoId}`);
      }}
    >
      <div className="search__left">
        <img
          src={thumbnails.high.url}
          alt="video medium img"
          className="video__medium__img cursor-pointer"
          
        />
      </div>
      <div className="search__right">
        <h3 className="search__title cursor-pointer">{title}</h3>
        <p className="search__description">{description}</p>
        <div className="d-flex align-items-center">
          <img src={thumbnails.default.url} className="channel__img" alt="" />
          <p className="mb-0 ml-3">
            <a href={`/channel/${channelId}`} className="channel__name">
              {channelTitle}
            </a>
          </p>
        </div>
        <p>{moment(publishedAt).fromNow()} &nbsp; 50 views</p>
      </div>
    </div>
  );
};

const PlaylistSearch = ({ item }) => {};
