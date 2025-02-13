import { useState } from "react";
import "./Create.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: -1 }],
    ["link", "image"],
    ["clean"],
  ],
};
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const createNewPost = async (ev) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    });
    console.log(await response.json());
  };

  return (
    <form onSubmit={createNewPost}>
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
      <ReactQuill
        theme="snow"
        className="custom-quill"
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
      />
      <button>Créer votre post</button>
    </form>
  );
};

export default CreatePost;
