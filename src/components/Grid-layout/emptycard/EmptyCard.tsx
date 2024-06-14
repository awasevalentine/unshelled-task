import { Typography } from "@mui/material";

type IProps = {
  text?: string;
};

const EmptyResult = ({ text }: IProps) => {
  return (
    <div className="flex w-full justify-center">
    <div className="w-[97%] md:w-[450px] h-[180px] flex justify-center items-center border-dashed border border-black rounded-lg ">
      <Typography className="text-[17px] opacity-70">
        {text ? text : "No record!"}
      </Typography>
    </div>
    </div>
  );
};

export default EmptyResult;
