import { useLocation } from "react-router-dom";
import ItemsWrapper from "./items";

const ViewItem = () => {
  const { state: getData } = useLocation();

  // Note, one  could use the Id to make a server call. but here i am just passing the data to the state
  return (
    <div className="flex w-full h-full min-h-screen justify-center items-center">
    <div className="w-[90%] md:w-[80%] lg:w-[700px] flex flex-col gap-[3rem]">
      <ItemsWrapper item={getData} />
    </div>
    </div>

  );
};

export default ViewItem;
