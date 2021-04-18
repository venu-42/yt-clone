import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteCustomScroll = ({children,length,fetchData}) => {
  return (
    <>
      <InfiniteScroll
        dataLength={length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
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
