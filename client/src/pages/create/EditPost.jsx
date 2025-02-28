import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./Create.scss";
import EditeurText from "../../components/editeur/EditeurText";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  // const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //recuperer les infos du post selon son ID
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((infoPost) => {
        setTitle(infoPost.title);
        setSummary(infoPost.summary);
        setContent(infoPost.content);
        // setCover(infoPost.cover);
      });
    });
  }, []);

  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Titre du Post"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Résumé Post"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <EditeurText
        value={content}
        onChange={(newValue) => setContent(newValue)}
      />
      <button>Update my post</button>
    </form>
  );
};

export default EditPost;
