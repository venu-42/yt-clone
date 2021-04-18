import React from "react";
import { useDispatch } from "react-redux";
import {
  getCategoryVideos,
  getHomeVideos,
} from "../../redux/actions/videoActions";
import "./_category.scss";

const tags = [
  "All",
  "React",
  "Redux",
  "Buttabomma",
  "Telugu Music",
  "firebase",
  "javascripy",
  "cricket",
  "Army",
  "React",
  "Redux",
  "Buttabomma",
  "Telugu Music",
  "React",
  "Redux",
  "Buttabomma",
  "Telugu Music",
  "Buttabomma",
  "Telugu Music",
  "React",
  "Redux",
  "Buttabomma",
  "Telugu Music",
  "Buttabomma",
  "Telugu Music",
  "React",
  "Redux",
  "Buttabomma",
  "Telugu Music",
];

const Tag = ({ content }) => {
  const dispatch = useDispatch();
  const clickHandler = (tag) => {
    console.log("handler category" + tag);
    if (tag === "All") dispatch(getHomeVideos());
    else dispatch(getCategoryVideos(tag));
  };
  return (
    <div className="tag" onClick={() => clickHandler(content)}>
      {content}
    </div>
  );
};

const Category = () => {
  return (
    <div className="category__slider">
      {tags.map((tag,id) => (
        <Tag className="tag" content={tag} key={id}></Tag>
      ))}
    </div>
  );
};

export default Category;
