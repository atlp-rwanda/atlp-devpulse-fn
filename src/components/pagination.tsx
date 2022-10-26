import { useState, useEffect } from 'react';

interface Gap {
  before: boolean;
  paginationGroup: number[];
  after: boolean;
}

const pagination = ({
  contentPerPage,
  count,
}: {
  contentPerPage: number;
  count: number;
}) => {
  const [paging, setPaging] = useState(1);

  const [gaps, setGaps] = useState<Gap>({
    before: false,
    paginationGroup: [],
    after: true,
  });

  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = paging * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;
  const [pagesInBetween, setPagesInBetween] = useState<number[]>([]);

  useEffect(() => {
    if (pageCount > 2) {
      const temp = new Array(pageCount - 2).fill(1).map((_, i) => i + 2);
      setPagesInBetween(temp);
    }
  }, [pageCount]);

  useEffect(() => {
    const currentLocation = pagesInBetween.indexOf(paging);
    let paginationGroup = [];
    let before = false;
    let after = false;
    if (paging === 1) {
      paginationGroup = pagesInBetween.slice(0, 3);
    } else if (
      paging === pageCount
      || paging === pageCount - 1
      || paging === pageCount - 2
    ) {
      paginationGroup = pagesInBetween.slice(-3, pageCount);
    } else if (paging === 2) {
      paginationGroup = pagesInBetween.slice(
        currentLocation,
        currentLocation + 3,
      );
    } else {
      paginationGroup = [paging - 1, paging, paging + 1];
    }
    if (pageCount <= 5) {
      before = false;
      after = false;
    } else {
      before = false;
      after = false;
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[2] < pageCount - 1) {
        after = true;
      }
    }
    setGaps({ paginationGroup, before, after });
  }, [paging, pagesInBetween, pageCount]);

  const changePage = (direction: boolean) => {
    setPaging((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      }

      if (state === 1) {
        return state;
      }
      return state - 1;
    });
  };

  const setPageSAFE = (num: number) => {
    if (num > pageCount) {
      setPaging(pageCount);
    } else if (num < 1) {
      setPaging(1);
    } else {
      setPaging(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPaging: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    paging,
    gaps,
  };
};

export default pagination;
