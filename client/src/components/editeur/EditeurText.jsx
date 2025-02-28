import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const EditeurText = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      className="custom-quill"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
};

export default EditeurText;
