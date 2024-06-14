import { Paper, Tooltip, useMediaQuery } from "@mui/material";
import { PostResponse } from "../../../interface/post.interface";
import { IoTrashOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { useDeletPostMutation } from "../../../lib/features/postSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

type IProps = {
  item: PostResponse;
};

const ItemsWrapper = ({ item }: IProps) => {
  const [deletePost, { isLoading, isSuccess, isError, error }] =
    useDeletPostMutation();
  const medaiMatch = useMediaQuery("(max-width:767px)");
  const navigate = useNavigate()

  const handleDelete = () => {
    deletePost(item?.id)
      .unwrap()
      .then((res) => {
        toast.success("Post successfully deleted!");
      })
      .catch((error: any) => {
        toast.error(error?.message || "Failed to delete post");
      });
  };

  const handleEdit = ()=>{
    navigate('/edit-post', 
        {
            state: item
        }
    )
  }
  return (
    <Paper
      elevation={1}
      className="flex flex-col gap-[12px] border py-[3rem] md:py-[4rem] px-[1rem] md:px-[3rem] rounded-[12px]"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-row gap-[12px] justify-end relative top-[-20px] right-0">
            <Tooltip title="Delete Post" placement="bottom">
              <IoTrashOutline
                onClick={handleDelete}
                size={18}
                color="red"
                className="hover:cursor-pointer hover:scale-110"
              />
            </Tooltip>
            <Tooltip title="Edit Post" placement="bottom" color="black">
              <MdModeEditOutline
                size={18}
                color="#002379"
                className="hover:cursor-pointer hover:scale-110"
                onClick={handleEdit}
              />
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <span className="text-[20px] font-bold antialised capitalize">
              {item?.title}
            </span>
          </div>
          <div className="flex flex-row gap-[4px]">
            <span className="antialised">{item?.body}</span>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default ItemsWrapper;
