import { cn } from '@/lib/utils'
import React from 'react'
import ReactPaginate from 'react-paginate'

const ReactPagination = ({ totalPage, setPage,className }) => {
    return (
      <>
        {totalPage > 0 && (
          <ReactPaginate
            previousLabel={"‹"}
            nextLabel={"›"}
            pageCount={totalPage}
            onPageChange={(e) => setPage(e.selected + 1)}
            containerClassName={cn(
              "flex items-center justify-center gap-2",
              className
            )}
            pageClassName={
              "flex justify-center items-center w-11 h-11 text-[#ABABAB] font-inter"
            }
            pageLinkClassName={"flex justify-center items-center w-full h-full"}
            activeClassName={"text-[blue]"}
            previousClassName={
              "w-8 h-10 flex justify-center items-center text-5xl text-[#1D1929] -mt-2"
            }
            nextClassName={
              "w-8 h-10 flex justify-center items-center text-5xl text-[#1D1929] -mt-2"
            }
            breakLabel={"..."}
            disabledClassName={" cursor-not-allowed"}
          />
        )}
      </>
    );
}

export default ReactPagination