import { useState } from "react";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { useUpdatePostMutation } from "../../lib/features/postSlice";
import { toast } from "react-toastify";

const EditPost = () => {
  const { state: data } = useLocation();
  const [post, setPost] = useState({
    title: data?.title || "",
    body: data?.body || "",
    userId: data?.userId || null,
    id: data?.id || null,
  });

  const [updatePost, {isLoading }] =
    useUpdatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    updatePost({ postId: data?.id, payload: post })
      .unwrap()
      .then((res) => {
        toast.success("Post successfuly updated!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to update post");
      });
  };

  const handleTextChange = (label: string, value: any) => {
    setPost((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen">
      <Paper
        className="w-[100%] md:w-[80%] lg:w-[700px] p-8 flex flex-col"
        elevation={3}
      >
        <div className="flex justify-center mt-[.5rem] mb-[3rem] md:mt-[1rem] m:mb-[4rem]">
          <Header title="Edit Post" size="30px" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-[1rem] md:gap-[2rem]"
        >
          <div className="flex flex-col gap-[4px] mb-4">
            <label
              htmlFor="title"
              className="text-[18px] font-semibold antialiased"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={post?.title}
              onChange={(e) => handleTextChange("title", e.target.value)}
              placeholder="Enter title"
              required
              className="p-2 border rounded outline-0"
            />
          </div>
          <div className="flex flex-col gap-[4px] mb-4">
            <label
              htmlFor="body"
              className="text-[18px] font-semibold antialiased"
            >
              Body
            </label>
            <textarea
              name="body"
              id="body"
              rows={5}
              value={post?.body}
              onChange={(e) => handleTextChange("body", e.target.value)}
              placeholder="Enter description"
              required
              className="p-2 border rounded outline-0"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-7 py-2 bg-[#5C2FC2] text-white rounded"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default EditPost;
