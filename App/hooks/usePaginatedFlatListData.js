import { useState, useCallback, useEffect, useRef } from 'react';

export const usePaginatedFlatListData = ({ url, itemsLimit = 10, initialPage = 1 }) => {
  const page = useRef(initialPage);
  const maxPages = useRef(0);
  const forceRefetch = useRef({});
  const preventDoubleFetchingMore = useRef(false);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = useCallback(async () => {
    const newData = await fetch(`${url}/?page=${page.current}&limit=${itemsLimit}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });
    const jsonNewData = await newData.json();

    if (newData.ok) {
      // simple GET_product API returns array while GET_product_search_name API returns object with data array
      const items = Array.isArray(jsonNewData) ? jsonNewData : jsonNewData?.data ?? [];
      maxPages.current = jsonNewData.totalPages;
      if (isFetchingMore) {
        setData((prev) => [...prev, ...items]);
      } else {
        setData(items);
      }
    } else {
      // handle error from server
    }

    setIsFetchingMore(false);
    setIsRefreshing(false);
    setIsLoading(false);

    preventDoubleFetchingMore.current = false;
  }, [isFetchingMore, itemsLimit, url]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    page.current = initialPage;
    // Required to force an update if we are on the first page
    forceRefetch.current = {};
  }, [initialPage]);

  // load data after page/url change or on refresh
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.current, forceRefetch.current, url]);

  // reset current page to initial after search input change
  useEffect(() => {
    page.current = initialPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const fetchMore = useCallback(() => {
    // do not try to fetch more if server page limit exceeded
    // or we are already fetching
    if (preventDoubleFetchingMore.current || page.current >= maxPages.current) return;
    page.current += 1;
    preventDoubleFetchingMore.current = true;
    setIsFetchingMore(true);
  }, []);

  return {
    data,
    isLoading,
    isRefreshing,
    isFetchingMore,
    fetchMore,
    refresh,
  };
};
