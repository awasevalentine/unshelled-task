import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useGetPostsQuery } from "../../lib/features/postSlice";
import Loader from "../../components/loader/Loader";
import EmptyResult from "../../components/Grid-layout/emptycard/EmptyCard";
import ItemsWrapper from "./component/items";
import { PostResponse } from "../../interface/post.interface";
import Header from "../../components/header/Header";
import CustomPagination from "../../components/pagination/Pagination";

const Posts = () => {
  const [start, setStart] = useState(0);
  const perPage = 10;

  const { isFetching, isError, isSuccess, data } = useGetPostsQuery({
    start,
    perPage,
  });

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-center py-[4rem]">
        <Header title="all amazing post" size="30px" />
      </div>
      <div className="min-h-[100vh]">
        {isFetching && <Loader />}
        {isSuccess && (
          <>
            {data?.data?.length === 0 ? (
              <EmptyResult text="No post created yet!" />
            ) : (
              <div className="flex justify-center w-full">
                <div className="w-[90%] md:w-[80%] lg:w-[700px] flex flex-col gap-[3rem]">
                  {data?.data?.map((res: any) => (
                    <ItemsWrapper item={res} key={res.id} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {data?.data?.length !== 0 && !isFetching && (
          <div className="flex w-full justify-center py-[2rem]">
            <CustomPagination
              totalItemsCount={data?.totalCount || 0}
              setStart={setStart}
              itemsPerPage={perPage}
              start={start}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
