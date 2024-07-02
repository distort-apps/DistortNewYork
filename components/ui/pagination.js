import styles from './pagination.module.css';
import ChevronRightIcon from './chevron-right';
import ChevronLeftIcon from './chevron-left';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className={styles.button}>
          <ChevronLeftIcon />
        </button>
      )}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className={styles.button}>
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}

export default Pagination;
