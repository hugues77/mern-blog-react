import "./Blog.scss";
import { format } from "date-fns";

const Blog = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="">
      <div className="post">
        <div className="image">
          <Link to={"/post/id"}>
            <img src={"http://localhost:4000/" + cover} alt="" />
          </Link>
        </div>
        <div className="text">
          <Link>
            <h2>{title} </h2>
          </Link>
          <p className="info">
            <a href="" className="author">
              {author.username}
            </a>
            <time>{format(new Date(createdAt), "dd MMMM yyyy | kk:mm")} </time>
          </p>
          <p className="summary">{summary}.</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
