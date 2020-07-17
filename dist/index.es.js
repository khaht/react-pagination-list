import { memo, useState, useEffect, createElement, Fragment } from 'react';
import PropTypes from 'prop-types';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_kPagination__1Fn7J {\n  padding: 0.5rem;\n  display: flex;\n  flex-direction: column; }\n  .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y {\n    padding-left: 0;\n    margin: 5px 0; }\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y li {\n      float: left;\n      list-style: none;\n      margin: 0 4px;\n      cursor: pointer; }\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationActive__uADtT {\n      color: #2196f3;\n      border-color: #2196f3 !important; }\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpNext__35b34,\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpPrev__1MwCn {\n      border: 0 !important;\n      font-size: 12px; }\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpNext__35b34 i,\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpPrev__1MwCn i {\n        opacity: 0;\n        position: absolute;\n        transition: all 200ms ease; }\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpNext__35b34 a,\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpPrev__1MwCn a {\n        opacity: 1;\n        position: absolute;\n        transition: all 200ms ease; }\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpNext__35b34:hover i,\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpPrev__1MwCn:hover i {\n        opacity: 1; }\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpNext__35b34:hover a,\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationJumpPrev__1MwCn:hover a {\n        opacity: 0; }\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationPrev__2vWHF,\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationNext__CfUnd,\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationItem__wT8RQ {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-width: 32px;\n      height: 32px;\n      text-align: center;\n      list-style: none;\n      background-color: #fff;\n      border: 1px solid #d9d9d9;\n      border-radius: 4px;\n      outline: 0;\n      cursor: pointer;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none; }\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationPrev__2vWHF:hover,\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationNext__CfUnd:hover,\n      .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPaginationItem__wT8RQ:hover {\n        color: #2196f3;\n        border-color: #2196f3 !important; }\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kPrevDisabled__2n17f,\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kNextDisabled__okBQe {\n      cursor: not-allowed;\n      color: #e8e6e6; }\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kiconLeft__nZnuu,\n    .styles_kPagination__1Fn7J .styles_kPaginationListPage__35e3Y .styles_kiconRight__2kD1x {\n      font-size: 12px; }\n";
var styles = {"kPagination":"styles_kPagination__1Fn7J","kPaginationListPage":"styles_kPaginationListPage__35e3Y","kPaginationActive":"styles_kPaginationActive__uADtT","kPaginationJumpNext":"styles_kPaginationJumpNext__35b34","kPaginationJumpPrev":"styles_kPaginationJumpPrev__1MwCn","kPaginationPrev":"styles_kPaginationPrev__2vWHF","kPaginationNext":"styles_kPaginationNext__CfUnd","kPaginationItem":"styles_kPaginationItem__wT8RQ","kPrevDisabled":"styles_kPrevDisabled__2n17f","kNextDisabled":"styles_kNextDisabled__okBQe","kiconLeft":"styles_kiconLeft__nZnuu","kiconRight":"styles_kiconRight__2kD1x"};
styleInject(css);

var countJump = 1;
var Main = memo(function (props) {
    var data = props.data, pageSize = props.pageSize, _a = useState([]), arrayList = _a[0], setArrayList = _a[1], _b = useState([]), arrItemPage = _b[0], setArrItemPage = _b[1], _c = useState(1), totalPage = _c[0], setTotalPage = _c[1], _d = useState(false), flagEnd = _d[0], setFlagEnd = _d[1];
    var _e = useState(1), currentPage = _e[0], setCurrentPage = _e[1];
    var jump = 5;
    useEffect(function () {
        var _a = handlePaginate(data, currentPage, pageSize ? pageSize : 0), arrayList = _a.arrayList, totalPage = _a.totalPage, pageCurrent = _a.pageCurrent;
        totalPage > 5
            ? setArrItemPage(Array.from(Array(5).keys()).slice())
            : setArrItemPage(Array.from(Array(totalPage).keys()).slice());
        setArrayList(arrayList);
        setTotalPage(totalPage);
        setCurrentPage(pageCurrent);
    }, [pageSize, data]);
    var handlePaginate = function (data, page, pageSize) {
        var result = {
            totalPage: 1,
            arrayList: [],
            arrayAll: data,
            nextPage: 1,
            prePage: 1,
            pageCurrent: 1
        };
        if (data.length > 0) {
            var totalPage_1 = Math.ceil(data.length / pageSize);
            var pageCurrent = !!page && page
                ? page !== 0
                    ? page <= totalPage_1
                        ? page
                        : totalPage_1
                    : 1
                : 1;
            var nextPage = pageCurrent < totalPage_1 ? pageCurrent + 1 : pageCurrent;
            var prePage = pageCurrent > 1 ? pageCurrent - 1 : pageCurrent;
            var arrayList_1 = pageSize !== 0 ? data.slice((page - 1) * pageSize, page * pageSize) : data;
            result["totalPage"] = totalPage_1;
            result["arrayList"] = arrayList_1;
            result["nextPage"] = nextPage;
            result["prePage"] = prePage;
            result["pageCurrent"] = pageCurrent;
        }
        return result;
    };
    var calNumberPage = function (countJump, index) {
        var page = 1;
        if (countJump === 1 && !flagEnd) {
            page = index;
        }
        else {
            if (totalPage - jump < 5) {
                page = totalPage - (jump - index);
            }
            else {
                page =
                    jump * countJump > totalPage
                        ? totalPage - (jump - index)
                        : jump * countJump - (jump - index);
            }
        }
        return page;
    };
    var setThemeItemSelected = function (selectedPage) {
        var liesNode = document.querySelectorAll(".k-pagination-item"), lies = Array.from(liesNode);
        for (var _i = 0, lies_1 = lies; _i < lies_1.length; _i++) {
            var li = lies_1[_i];
            li.classList.remove(styles.kPaginationActive);
            var thisPage = li.getAttribute("title");
            if (thisPage) {
                if (thisPage == selectedPage) {
                    li.classList.add(styles.kPaginationActive);
                }
            }
        }
    };
    var _onChangePage = function (page, type) {
        var arrayList = handlePaginate(data, page, pageSize ? pageSize : 0).arrayList;
        props.onPageChange && props.onPageChange({ page: page, totalPage: totalPage });
        setCurrentPage(page);
        setArrayList(arrayList);
        setThemeItemSelected(page);
        if (type) {
            countJump = type === "first" ? 1 : Math.ceil(totalPage / jump);
        }
    };
    var _showListPage = function (totalPage) {
        var firstPage = 1, lastPage = totalPage, elmLastPage = (createElement("li", { key: lastPage, title: "" + lastPage, onClick: function () { return _onChangePage(lastPage, "last"); }, className: styles.kPaginationItem }, lastPage)), elmFirstPage = (createElement("li", { key: firstPage, title: "" + firstPage, onClick: function () { return _onChangePage(firstPage, "first"); }, className: styles.kPaginationItem + " " + (currentPage === 1 ? styles.kPaginationActive : "") }, firstPage)), elmIconJumpNext = null, elmIconJumpPrev = null;
        var setDefaultPageCurrent = function (state) {
            if (!state) {
                var pageDefaultNext = totalPage - (jump - 1);
                setCurrentPage(pageDefaultNext);
                _onChangePage(pageDefaultNext);
            }
            else {
                var pageDefaultNext = jump * countJump - (jump - 1);
                pageDefaultNext =
                    pageDefaultNext === totalPage ? pageDefaultNext - 4 : pageDefaultNext;
                setCurrentPage(pageDefaultNext);
                _onChangePage(pageDefaultNext);
            }
        };
        var _onGetJumpNext = function () {
            var isNextFull = true;
            if (arrItemPage.length + jump > totalPage) {
                isNextFull = false;
                setFlagEnd(true);
            }
            else {
                countJump++;
            }
            setArrItemPage(Array.from(Array(jump).keys()).slice());
            setDefaultPageCurrent(isNextFull);
        };
        var _onGetJumpPrev = function () {
            var isNextFull = true;
            if (arrItemPage.length + jump > totalPage) {
                //jump 5 next page larger total page
                isNextFull = false;
                setFlagEnd(false);
            }
            else {
                countJump--;
            }
            setArrItemPage(Array.from(Array(jump).keys()).slice());
            setDefaultPageCurrent(isNextFull);
        };
        if (totalPage > jump) {
            //set icon jump next
            elmIconJumpNext = (createElement("li", { key: "jump_next", onClick: _onGetJumpNext, title: "Jump Next", className: styles.kPaginationItem + " " + styles.kPaginationJumpNext },
                createElement("i", null,
                    createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "double-right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                        createElement("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" }))),
                createElement("a", null, "•••")));
            // set icon jump prev
            elmIconJumpPrev = (createElement("li", { key: "jump_prev", onClick: _onGetJumpPrev, title: "Jump Prev", className: styles.kPaginationItem + " " + styles.kPaginationJumpPrev },
                createElement("i", null,
                    createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "double-left", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                        createElement("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }))),
                createElement("a", null, "•••")));
        }
        var listPage = arrItemPage.map(function (_item, index) {
            var pagePos = calNumberPage(countJump, ++index);
            return (createElement("li", { title: "" + pagePos, className: styles.kPaginationItem + " " + (currentPage === pagePos ? styles.kPaginationActive : ""), onClick: function () { return _onChangePage(pagePos); }, key: pagePos }, pagePos));
        });
        if (totalPage > 5) {
            var elmJumpNextPage = (createElement(Fragment, { key: "wrap_jump_next" }, countJump * jump < totalPage ? (createElement(Fragment, null,
                elmIconJumpNext,
                elmLastPage)) : null));
            var elmJumpPrevPage = (createElement(Fragment, { key: "wrap_jump_prev" },
                elmFirstPage,
                elmIconJumpPrev));
            if (countJump > 1 || flagEnd)
                listPage.unshift(elmJumpPrevPage);
            if (!flagEnd)
                listPage.push(elmJumpNextPage);
        }
        return listPage;
    };
    var _onPrevPage = function () {
        if (currentPage !== 1) {
            --currentPage;
            _onChangePage(currentPage);
        }
        if (totalPage % jump === 0) {
            if (currentPage % jump === 0) {
                countJump--;
            }
        }
        else {
            if (countJump === Math.ceil(totalPage / jump)) {
                if (totalPage - currentPage === jump) {
                    countJump--;
                }
            }
            else {
                if (currentPage % jump === 0) {
                    countJump--;
                }
            }
        }
    };
    var _onNextPage = function () {
        if (currentPage !== totalPage) {
            ++currentPage;
            _onChangePage(currentPage);
        }
        if (currentPage % jump === 1)
            countJump++;
    };
    var showListPaginate = function () {
        return pageSize && pageSize !== 0 ? (createElement("ul", { className: styles.kPaginationListPage },
            createElement("li", { className: styles.kPaginationPrev + " " + (currentPage !== 1 ? "" : "" + styles.kPrevDisabled), onClick: _onPrevPage },
                createElement("i", { className: styles.kicon + " " + styles.kiconLeft },
                    createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                        createElement("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })))),
            _showListPage(totalPage),
            createElement("li", { className: styles.kPaginationNext + " " + (currentPage !== totalPage ? "" : "" + styles.kNextDisabled), onClick: _onNextPage },
                createElement("i", { className: styles.kicon + " " + styles.kiconRight },
                    createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                        createElement("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })))))) : (createElement("div", null));
    };
    return (createElement("div", { className: styles.kPagination },
        createElement("div", { className: styles.kPaginationListItem }, arrayList.map(function (item, key) { return props.renderItem(item, key); })),
        showListPaginate()));
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
//# sourceMappingURL=index.es.js.map
