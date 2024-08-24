import React from "react";
import { Box, Button, HStack, Link, useBreakpointValue } from "@chakra-ui/react";

type Props = {
  currentPage: number;
  limit: number;
  count: number;
  path: string;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, limit, count, path }: Props) {
  const totalPages = Math.ceil(count / limit);

  // 表示するページ数を最大10ページに設定
  const maxPageNumbersToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(maxPageNumbersToShow / 2));

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

  return (
    <HStack spacing={2}>
      <Link href={`${path}?p=${currentPage - 1}`} aria-label="Previous Page">
        <Button
          disabled={currentPage === 1}
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
      {showPageNumbers && pageNumbers.map((number) => (
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
      <Link href={`${path}?p=${currentPage + 1}`} aria-label="Next Page">
        <Button
          disabled={currentPage === totalPages}
          colorScheme="white"
          variant="outline"
          _disabled={{ cursor: "not-allowed", opacity: 0.5 }}
          borderRadius="full"
          border="none"
          _hover={{ color: "blue.500" }}
          ml={8}
        >
          Next Page →
        </Button>
      </Link>
    </HStack>
  );
}
