import { CircularProgress } from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteCustomScroll = ({children,length,fetchData,loading,hasMore,for1}) => {
  if(for1==='comments')
  console.log(hasMore,'for',for1);
  return (
    <>
      <InfiniteScroll
        dataLength={length} //This is important field to render the next data
        next={fetchData}
        // hasMore={hasMore?hasMore:true}
        hasMore={(hasMore??true)||hasMore}
        loader={
          // <div className="spinner-border" role="status">
          //   <span className="sr-only">Loading...</span>
          // </div>
          // <h6>Loading...</h6>
          ((loading===null||loading===undefined)||loading===true)?
          <CircularProgress />:<></>
        }
        endMessage={
          <>
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          </>
        }
      >
          {children}
      </InfiniteScroll>
    </>
  );
};

export default InfiniteCustomScroll;
