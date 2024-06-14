import { CircularProgress } from "@mui/material";

type IProps ={
    spinnerColor?: string;
    spinerSize?: string
}

const Loader = ({spinerSize, spinnerColor}: IProps) => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <CircularProgress sx={{ color: spinnerColor ? spinnerColor : "#FF6969" }} size={spinerSize ? spinerSize : "35px"} />
    </div>
  );
};

export default Loader;
