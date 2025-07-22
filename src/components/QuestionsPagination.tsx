
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface QuestionsPaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onPageChange: (page: number) => void;
}

export function QuestionsPagination({
  paginaAtual,
  totalPaginas,
  onPageChange,
}: QuestionsPaginationProps) {
  if (totalPaginas <= 1) return null;

  const pageItems = [];
  let startPage = Math.max(1, paginaAtual - 2);
  let endPage = Math.min(totalPaginas, paginaAtual + 2);

  if (paginaAtual <= 3) {
    endPage = Math.min(5, totalPaginas);
  }
  if (paginaAtual >= totalPaginas - 2) {
    startPage = Math.max(1, totalPaginas - 4);
  }

  if (startPage > 1) {
    pageItems.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    if (startPage > 2) {
      pageItems.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          isActive={paginaAtual === i}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (endPage < totalPaginas) {
    if (endPage < totalPaginas - 1) {
      pageItems.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    pageItems.push(
      <PaginationItem key={totalPaginas}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(totalPaginas);
          }}
        >
          {totalPaginas}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(paginaAtual - 1);
            }}
            className={
              paginaAtual === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        {pageItems}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(paginaAtual + 1);
            }}
            className={
              paginaAtual === totalPaginas
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
