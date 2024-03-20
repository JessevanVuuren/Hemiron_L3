/**
 * These interfaces are based on their Spring Boot implementations.
 * [Spring Boot Pagination Documentation](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/package-summary.html)
 */

/**
 * Represents a paginated page of data.
 *
 * @typeParam T - The type of content in the page.
 */
export interface Page<T> {
  /**
   * The array of content items in the page.
   */
  content: T[]

  /**
   * Information about the pageable configuration.
   */
  pageable: Pageable

  /**
   * Indicates if this is the last page.
   */
  last: boolean

  /**
   * Gets the total number of elements across all pages.
   */
  totalElements: number

  /**
   * Gets the total number of pages.
   */
  totalPages: number

  /**
   * The size of the page (number of elements).
   */
  size: number

  /**
   * The current page number.
   */
  number: number

  /**
   * Information about the sorting configuration.
   */
  sort: Sort

  /**
   * Indicates if this is the first page.
   */
  first: boolean

  /**
   * The number of elements in the current page.
   */
  numberOfElements: number

  /**
   * Indicates if the page is empty.
   */
  empty: boolean
}

/**
 * Represents pageable settings for pagination.
 */
export interface Pageable {
  /**
   * The page number.
   */
  pageNumber: number

  /**
   * The size of each page.
   */
  pageSize: number

  /**
   * Information about the sorting configuration.
   */
  sort: Sort

  /**
   * The offset of the current page.
   */
  offset: number

  /**
   * Indicates if pagination is disabled (unpaged).
   */
  unpaged: boolean

  /**
   * Indicates if pagination is enabled (paged).
   */
  paged: boolean
}

/**
 * Represents sorting settings for pagination.
 */
export interface Sort {
  /**
   * Indicates if the sorting configuration is empty.
   */
  empty: boolean

  /**
   * Indicates if the sorting is unsorted.
   */
  unsorted: boolean

  /**
   * Indicates if the sorting is sorted.
   */
  sorted: boolean
}
