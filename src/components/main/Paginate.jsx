"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";

export default function Paginate({ length }) {
    const route = useRouter();
    const searchParams = useSearchParams();

    const itemsPerPage = 9;

    let page = parseInt(searchParams.get("p") || 1);
    let pageCount = Math.ceil(length / itemsPerPage);

    const [currentId, setCurrent] = useState(1);


    // create start & end Array
    const listArray = []
    for (let i = 0; i < pageCount; i++) {
        listArray.push(i + 1)
    }
    const startArray = []
    for (let i = 0; i < pageCount; i++) {
        startArray.push(i * itemsPerPage);
    }
    const endArray = []
    for (let i = 0; i < pageCount; i++) {
        endArray.push((i + 1) * itemsPerPage);
    }

    const lastArrayIndex = listArray.at(-1);

    // handle prevPage
    function prevPage() {
        if (currentId >= 1) {
            setCurrent(prev => prev - 1);
            route.push(`?p=${currentId - 1}&s=${startArray[currentId - 2]}&e=${endArray[currentId - 2]}`);
        }
    }
    // handle nextPage
    function nextPage() {
        setCurrent(prev => prev + 1);
        if (currentId <= lastArrayIndex) {
            route.push(`?p=${currentId + 1}&s=${startArray[currentId]}&e=${endArray[currentId]}`);
        }
    }
    // handle get value for Min params
    function getMinValue(e) {
        let btnId = e.currentTarget.id - 2;
        setCurrent(btnId);
        if (lastArrayIndex >= page) {
            route.push(`?p=${btnId}&s=${startArray[btnId - 1]}&e=${endArray[btnId - 1]}`);
        }
    }


    return (
        <Box
            id="pagination"
            className="pagination-container"
            style={{
                bottom: 0,
                display: 'flex',
                background: "none",
                padding: "1rem",
                placeContent: 'center',
            }}
            mb={{ base: '0', sm: '10rem', md: '0', lg: '0' }}
        >
            <button
                className="btnPrevNext"
                onClick={prevPage}
                disabled={page === 1 ? true : false}
            >
                قبلی
            </button>

            <Flex color='black' className="flexCenter" cursor='none' >...</Flex>
            <button
                className={`btn ${currentId === page ? "active" : null}`}
                color="primary"
            >
                {page}
            </button>
            <Flex color='black' className="flexCenter" cursor='none' >...</Flex>

            <button
                className="btnPrevNext"
                onClick={nextPage}
                disabled={page === pageCount ? true : false}
            >
                بعدی
            </button>
        </Box>
    )
}




