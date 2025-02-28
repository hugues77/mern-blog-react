import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/textContext";
import { Link, useParams } from "react-router-dom";
import "./PostDetails.scss";
import { formatISO9075 } from "date-fns";

const PostDetails = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((detailsPost) => {
        setPostInfo(detailsPost);
      });
    });
    // console.log(id);
  }, []);

  if (!postInfo) {
    return "";
  }

  return (
    <div className="post-page">
      <h1 className="title">{postInfo.title} </h1>
      <div className="content">
        <time>{formatISO9075(new Date(postInfo.createdAt))} </time>
        {userInfo.userId === postInfo.author._id && (
          <div className="edit-post">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
              Modifier mon post
            </Link>
          </div>
        )}
        <span className="author">by {postInfo.author.username} </span>
      </div>

      <div className="image">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostDetails;
