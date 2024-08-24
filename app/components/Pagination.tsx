'use client';

import React from "react";
import { Box, Button, HStack, Link, useBreakpointValue } from "@chakra-ui/react";

type Props = {
  currentPage: number;
  limit: number;
  count: number;
  path: string;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, limit, count, path, onPageChange }: Props) {

  const totalPages = Math.ceil(count / limit);

  // 表示するページ数を最大10ページに設定
  const maxPageNumbersToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));

  let endPage = startPage + maxPageNumbersToShow - 1;

  // ページ番号の範囲が最大10ページになるように調整
  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    if (startPage === 1) {
      endPage = Math.min(maxPageNumbersToShow, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const showPageNumbers = useBreakpointValue({ base: false, md: true });
  // モバイル時は非表示にし、デスクトップ時は表示

  const handlePageChange = (page: number) => {
    onPageChange(page); // ページ変更のコールバックを呼びだし
  };

  return (
    <HStack spacing={2}>
      {/* currentPageが1でないときにのみ「Previous Page」ボタンを表示する */}
      {currentPage > 1 && (
        <Link href={`${path}?p=${currentPage - 1}`} aria-label="Previous Page">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            colorScheme="white"
            variant="outline"
            _disabled={{ cursor: "not-allowed", opacity: 0.5 }}
            borderRadius="full"
            border="none"
            _hover={{ color: "blue.500" }}
            mr={8}
          >
            ← Previous Page
          </Button>
        </Link>
      )}

      {showPageNumbers &&
        pageNumbers.map((number) => (
          <Link key={number} href={`${path}?p=${number}`}>
            <Button
              colorScheme={currentPage === number ? "blue" : undefined}
              variant={currentPage === number ? "solid" : "outline"}
              borderRadius="full"
            >
              {number}
            </Button>
          </Link>
        ))}

      {/* currentPageがtotalPages未満の場合にのみ「Next Page」ボタンを表示する */}
      {currentPage < totalPages && (
        <Link href={`${path}?p=${currentPage + 1}`} aria-label="Next Page">
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            colorScheme="white"
            variant="outline"
            borderRadius="full"
            border="none"
            _hover={{ color: "blue.500" }}
            ml={8}
          >
            Next Page →
          </Button>
        </Link>
      )}
    </HStack>
  );
}
