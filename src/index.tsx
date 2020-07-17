import * as React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

export interface OnPageChangeProps {
  page: number
  totalPage: number
}

interface Props {
  data: Array<any>;
  pageSize: number;
  renderItem: Function;
  onPageChange: ({ page }: OnPageChangeProps) => any;
}

interface DataPaginate {
  totalPage: number;
  arrayList: Array<any>;
  arrayAll: Array<any>;
  nextPage: number;
  prePage: number;
  pageCurrent: number;
}

let countJump = 1;
const Main: React.FC<Props> = React.memo(props => {
  const { data, pageSize }: Props = props,
    [arrayList, setArrayList] = React.useState<Array<any>>([]),
    [arrItemPage, setArrItemPage] = React.useState<Array<any>>([]),
    [totalPage, setTotalPage] = React.useState<number>(1),
    [flagEnd, setFlagEnd] = React.useState<boolean>(false);
  let [currentPage, setCurrentPage] = React.useState<number>(1);

  const jump: number = 5;
  React.useEffect(() => {
    const { arrayList, totalPage, pageCurrent } = handlePaginate(
      data,
      currentPage,
      pageSize ? pageSize : 0
    );
    totalPage > 5
      ? setArrItemPage([...Array.from(Array(5).keys())])
      : setArrItemPage([...Array.from(Array(totalPage).keys())]);
      setArrayList(arrayList);
      setTotalPage(totalPage);
      setCurrentPage(pageCurrent);
  }, [pageSize, data]);

  const handlePaginate = (
    data: Array<any>,
    page: number,
    pageSize: number
  ): any => {
    const result: DataPaginate = {
      totalPage: 1,
      arrayList: [],
      arrayAll: data,
      nextPage: 1,
      prePage: 1,
      pageCurrent: 1
    };
    if (data.length > 0) {
      const totalPage: number = Math.ceil(data.length / pageSize);
      let pageCurrent: number =
        !!page && page
          ? page !== 0
            ? page <= totalPage
              ? page
              : totalPage
            : 1
          : 1;
      const nextPage: number =
        pageCurrent < totalPage ? pageCurrent + 1 : pageCurrent;
      const prePage: number = pageCurrent > 1 ? pageCurrent - 1 : pageCurrent;
      const arrayList: Array<any> =
        pageSize !== 0 ? data.slice((page - 1) * pageSize, page * pageSize) : data;
      result["totalPage"] = totalPage;
      result["arrayList"] = arrayList;
      result["nextPage"] = nextPage;
      result["prePage"] = prePage;
      result["pageCurrent"] = pageCurrent;
    }

    return result;
  };
  const calNumberPage = (countJump: number, index: number): number => {
    let page: number = 1;
    if (countJump === 1 && !flagEnd) {
      page = index;
    } else {
      if (totalPage - jump < 5) {
        page = totalPage - (jump - index);
      } else {
        page =
          jump * countJump > totalPage
            ? totalPage - (jump - index)
            : jump * countJump - (jump - index);
      }
    }
    return page;
  };
  const setThemeItemSelected = (selectedPage: number | string | null): void => {
    const liesNode: NodeListOf<HTMLLIElement> = document.querySelectorAll(
      ".k-pagination-item"
    ),
      lies: HTMLLIElement[] = Array.from(liesNode);
    for (const li of lies) {
      li.classList.remove(styles.kPaginationActive);
      const thisPage: number | string | null = li.getAttribute("title");
      if (thisPage) {
        if (thisPage == selectedPage) {
          li.classList.add(styles.kPaginationActive);
        }
      }
    }
  };

  const _onChangePage = (page: number, type?: string): void => {
    const { arrayList } = handlePaginate(data, page, pageSize ? pageSize : 0);

    props.onPageChange && props.onPageChange({ page, totalPage })

    setCurrentPage(page);
    setArrayList(arrayList);
    setThemeItemSelected(page);
    if (type) {
      countJump = type === "first" ? 1 : Math.ceil(totalPage / jump);
    }
  };

  const _showListPage = (totalPage: number): Array<any> => {
    let firstPage: number = 1,
      lastPage: number = totalPage,
      elmLastPage: React.ReactChild = (
        <li
          key={lastPage}
          title={`${lastPage}`}
          onClick={() => _onChangePage(lastPage, "last")}
          className={styles.kPaginationItem}
        >
          {lastPage}
        </li>
      ),
      elmFirstPage: React.ReactChild = (
        <li
          key={firstPage}
          title={`${firstPage}`}
          onClick={() => _onChangePage(firstPage, "first")}
          className={`${styles.kPaginationItem} ${currentPage === 1 ? styles.kPaginationActive : ""
            }`}
        >
          {firstPage}
        </li>
      ),
      elmIconJumpNext = null,
      elmIconJumpPrev = null;

    const setDefaultPageCurrent = (state: boolean): void => {
      if (!state) {
        const pageDefaultNext = totalPage - (jump - 1);
        setCurrentPage(pageDefaultNext);
        _onChangePage(pageDefaultNext);
      } else {
        let pageDefaultNext = jump * countJump - (jump - 1);
        pageDefaultNext =
          pageDefaultNext === totalPage ? pageDefaultNext - 4 : pageDefaultNext;
        setCurrentPage(pageDefaultNext);
        _onChangePage(pageDefaultNext);
      }
    };

    const _onGetJumpNext = (): void => {
      let isNextFull = true;
      if (arrItemPage.length + jump > totalPage) {
        isNextFull = false;
        setFlagEnd(true);
      } else {
        countJump++;
      }
      setArrItemPage([...Array.from(Array(jump).keys())]);
      setDefaultPageCurrent(isNextFull);
    };

    const _onGetJumpPrev = (): void => {
      let isNextFull = true;
      if (arrItemPage.length + jump > totalPage) {
        //jump 5 next page larger total page
        isNextFull = false;
        setFlagEnd(false);
      } else {
        countJump--;
      }
      setArrItemPage([...Array.from(Array(jump).keys())]);
      setDefaultPageCurrent(isNextFull);
    };
    if (totalPage > jump) {
      //set icon jump next
      elmIconJumpNext = (
        <li
          key={"jump_next"}
          onClick={_onGetJumpNext}
          title="Jump Next"
          className={`${styles.kPaginationItem} ${styles.kPaginationJumpNext}`}
        >
          <i>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="double-right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path>
            </svg>
          </i>
          <a>{"•••"}</a>
        </li>
      );
      // set icon jump prev
      elmIconJumpPrev = (
        <li
          key={"jump_prev"}
          onClick={_onGetJumpPrev}
          title="Jump Prev"
          className={`${styles.kPaginationItem} ${styles.kPaginationJumpPrev}`}
        >
          <i>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="double-left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
            </svg>
          </i>
          <a>{"•••"}</a>
        </li>
      );
    }
    const listPage = arrItemPage.map((_item, index) => {
      const pagePos: number = calNumberPage(countJump, ++index);
      return (
        <li
          title={`${pagePos}`}
          className={`${styles.kPaginationItem} ${currentPage === pagePos ? styles.kPaginationActive : ""
            }`}
          onClick={() => _onChangePage(pagePos)}
          key={pagePos}
        >
          {pagePos}
        </li>
      );
    });

    if (totalPage > 5) {
      const elmJumpNextPage = (
        <React.Fragment key={"wrap_jump_next"}>
          {countJump * jump < totalPage ? (
            <>
              {elmIconJumpNext}
              {elmLastPage}
            </>
          ) : null}
        </React.Fragment>
      );
      const elmJumpPrevPage = (
        <React.Fragment key={"wrap_jump_prev"}>
          {elmFirstPage}
          {elmIconJumpPrev}
        </React.Fragment>
      );
      if (countJump > 1 || flagEnd) listPage.unshift(elmJumpPrevPage);
      if (!flagEnd) listPage.push(elmJumpNextPage);
    }
    return listPage;
  };

  const _onPrevPage = (): void => {
    if (currentPage !== 1) {
      --currentPage
      _onChangePage(currentPage);
    }
    if (totalPage % jump === 0) {
      if (currentPage % jump === 0) {
        countJump--;
      }
    } else {
      if (countJump === Math.ceil(totalPage / jump)) {
        if (totalPage - currentPage === jump) {
          countJump--;
        }
      } else {
        if (currentPage % jump === 0) {
          countJump--;
        }
      }
    }
  };
  const _onNextPage = (): void => {
    if (currentPage !== totalPage) {
      ++currentPage
      _onChangePage(currentPage);
    }
    if (currentPage % jump === 1) countJump++;
  };

  const showListPaginate = (): React.ReactChild => {
    return pageSize && pageSize !== 0 ? (
      <ul className={styles.kPaginationListPage}>
        <li
          className={`${styles.kPaginationPrev} ${currentPage !== 1 ? "" : `${styles.kPrevDisabled}`
            }`}
          onClick={_onPrevPage}
        >
          <i className={`${styles.kicon} ${styles.kiconLeft}`}>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
            </svg>
          </i>
        </li>
        {_showListPage(totalPage)}
        <li
          className={`${styles.kPaginationNext} ${currentPage !== totalPage ? "" : `${styles.kNextDisabled}`
            }`}
          onClick={_onNextPage}
        >
          <i className={`${styles.kicon} ${styles.kiconRight}`}>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
            </svg>
          </i>
        </li>
      </ul>
    ) : (
        <div></div>
      );
  };
  return (
    <div className={styles.kPagination}>
      <div className={styles.kPaginationListItem}>
        {arrayList.map((item, key) => props.renderItem(item, key))}
      </div>
      {showListPaginate()}
    </div>
  );
});
Main.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
};
Main.defaultProps = {
  data: [],
  pageSize: 0,
  renderItem: undefined
};
export default Main;
