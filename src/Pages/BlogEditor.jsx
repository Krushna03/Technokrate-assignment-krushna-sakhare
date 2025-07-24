import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";

const BlogEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title || !content) return toast.error("All fields required");
    toast.success("Blog Created!");
    setContent("");
    setTitle("");
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-4">
        Publish
      </button>
    </div>
  );
};

export default BlogEditor;