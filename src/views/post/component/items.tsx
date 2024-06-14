import { Paper, Tooltip, useMediaQuery } from "@mui/material";
import { PostResponse } from "../../../interface/post.interface";
import { IoTrashOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { useDeletPostMutation } from "../../../lib/features/postSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

type IProps = {
  item: PostResponse;
};

const ItemsWrapper = ({ item }: IProps) => {
  const [deletePost, { isLoading }] = useDeletPostMutation();
  const mediaMatch = useMediaQuery("(max-width:767px)");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deletePost(item?.id)
      .unwrap()
      .then(() => {
        toast.success("Post successfully deleted!");
        navigate("/");
      })
      .catch((error: any) => {
        toast.error(error?.message || "Failed to delete post");
      });
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate("/edit-post", {
      state: item,
    });
  };

  const handlePathnameCheck = (path: string) => {
    return pathname?.toLowerCase()?.includes(path.toLowerCase());
  };

  const handleBack = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(-1);
  };

  const shortenText = (text: string) => {
    if (!handlePathnameCheck("post-details")) {
      if (mediaMatch && text?.length > 25) {
        return ` ${text?.slice(0, 25)} ...`;
      } else if (!mediaMatch && text.length > 35) {
        return ` ${text?.slice(0, 35)} ...`;
      } else {
        return text;
      }
    } else {
      return text;
    }
  };

  return (
    <Paper
      elevation={1}
      className={`relative flex flex-col gap-[12px] hover:cursor-pointer border py-[3rem] md:py-[4rem] px-[1rem] md:px-[3rem] rounded-[12px] transition-transform duration-200`}
      onClick={() =>
        navigate(`/post-details/${item?.id}`, {
          state: item,
        })
      }

      sx={{
        '&:hover':{
          transform: `${handlePathnameCheck("/post-details") ? "scale(1)" : "scale(1.05)"}`
        }
      }}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
            <Loader />
          </div>
        )}
        <div
          className={`flex flex-col gap-[12px] ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {handlePathnameCheck("/post-details") && (
            <div className="flex flex-row justify-between items-center relative top-[-20px] right-0 z-20">
              <Paper
                elevation={2}
                className="px-[.5rem] hover:cursor-pointer hover:scale-110"
              >
                <BiArrowBack onClick={handleBack} size={20} />
              </Paper>

              <div className="flex flex-row gap-[12px]">
                <Tooltip title="Delete Post" placement="bottom">
                  <IoTrashOutline
                    onClick={handleDelete}
                    size={18}
                    color="red"
                    className="hover:cursor-pointer hover:scale-110"
                  />
                </Tooltip>
                <Tooltip title="Edit Post" placement="bottom">
                  <MdModeEditOutline
                    size={18}
                    color="#002379"
                    className="hover:cursor-pointer hover:scale-110"
                    onClick={handleEdit}
                  />
                </Tooltip>
              </div>
            </div>
          )}
          <div className="flex flex-row">
            <span className="text-[20px] font-bold antialiased capitalize">
              {shortenText(item?.title)}
            </span>
          </div>
          <div className="flex flex-row gap-[4px]">
            <span className="antialiased">{item?.body}</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ItemsWrapper;
