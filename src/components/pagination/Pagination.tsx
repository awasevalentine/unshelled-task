import { Pagination, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IPagination {
  itemsPerPage?: number;
  setStart: (e: number) => void;
  start: number;
  totalItemsCount: number;
}

const CustomPagination = ({ itemsPerPage, totalItemsCount, setStart, start }: IPagination) => {
  const perPage = itemsPerPage || 10;
  const totalPages = Math.ceil(totalItemsCount / perPage);
  const mediaMatch = useMediaQuery("(max-width:767px)")

  const [page, setPage] = useState(Math.floor(start / perPage) + 1);
  const location = useLocation()
  const navigate = useNavigate()



  useEffect(()=>{
    const params = new URLSearchParams(location?.search)
    params.set("page", page.toString())
    params.set("per_page", perPage.toString())
    navigate(`${location.pathname}?${params.toString()}`)
  },[])

  useEffect(() => {
    setPage(Math.floor(start / perPage) + 1);
  }, [start, perPage]);

  useEffect(() => {
    const startPage = (page - 1) * perPage;
    setStart(startPage);
  }, [page, perPage, setStart]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(location?.search)
        params.set("page", value.toString())
        params.set("per_page", perPage.toString())
        navigate(`${location.pathname}?${params.toString()}`)
        setPage(value);
  };

  return (
    <div className="flex w-full justify-center py-[2rem]">
      <Pagination
        count={totalPages}
        variant="outlined"
        page={page}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        siblingCount={mediaMatch ? 0 : 2}
      />
    </div>
  );
};

export default CustomPagination;
