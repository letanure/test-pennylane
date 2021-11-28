import { Pagination as PaginationBS } from 'react-bootstrap'

export type PaginationProps = {
  total: number
  page: number
  onPageChange: (page: number) => void
}

const Pagination = ({ total, page, onPageChange }: PaginationProps) => {
  return (
    <>
      <PaginationBS>
        {[...Array(total)].map((el, ind) => (
          <PaginationBS.Item
            key={ind}
            active={page === ind + 1}
            onClick={() => onPageChange(ind + 1)}
          >
            {ind + 1}
          </PaginationBS.Item>
        ))}
      </PaginationBS>
    </>
  )
}

export default Pagination
