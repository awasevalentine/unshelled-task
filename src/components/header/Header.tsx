import { Box } from "@mui/material";

type IProps = {
  title: string;
  color?: string;
  size?: string;
};

const Header = ({ title, color, size }: IProps) => {
  return (
    <Box
      className="font-bold capitalize"
      sx={{
        fontSize: size ? size : "20px",
        color: color ? color : "#5C2FC2",
      }}
    >
      {title}
    </Box>
  );
};

export default Header;
