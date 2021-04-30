import { CircularProgress } from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteCustomScroll = ({children,length,fetchData,loading,hasMore,loader:Loader,endMessage}) => {
  return (
    <>
      <InfiniteScroll
        dataLength={length} //This is important field to render the next data
        next={fetchData}
        // hasMore={hasMore?hasMore:true}
        hasMore={(hasMore??true)||hasMore}
        // hasMore={false}
        loader={
          // <div className="spinner-border" role="status">
          //   <span className="sr-only">Loading...</span>
          // </div>
          // <h6>Loading...</h6>
          Loader?<Loader />:((loading===null||loading===undefined)||loading===true)?
          <CircularProgress />:(<></>)
        }
        endMessage={
          <>
            <p style={{ textAlign: "center",display:'block',width:'100%' }}>
              <b>{endMessage?endMessage:'Yay! You have seen it all'}</b>
            </p>
          </>
        }
      >
          {children}
      </InfiniteScroll>
      {/* {children} */}
    </>
  );
};

export default InfiniteCustomScroll;
