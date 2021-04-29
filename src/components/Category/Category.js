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
  "Spiderman",
  "Telugu Music",
  "firebase",
  "javascripy",
  "cricket",
  "Army",
];

const Tag = ({ content }) => {
  const dispatch = useDispatch();
  const clickHandler = (tag) => {
    console.log("handler category" + tag);
    if (tag === "All") dispatch(getHomeVideos());
    else dispatch(getCategoryVideos(tag));
  };
  return (
    <p className="tag" onClick={() => clickHandler(content)}>
      {content}
    </p>
  );
};

const Category = () => {
  return (
    <div className="category__slider mt-2">
      {tags.map((tag,id) => (
        <Tag className="tag" content={tag} key={id}></Tag>
      ))}
    </div>
  );
};

export default Category;
