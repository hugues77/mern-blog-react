import { useEffect, useState } from "react";
import Blog from "../../components/blog/Blog";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) =>
      response.json().then((posts) => {
        // console.log(posts);
        setPosts(posts);
      })
    );
  }, []);
  return (
    <div>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <div key={index}>
            <Blog {...post} />
          </div>
        ))}
    </div>
  );
};

export default Home;
