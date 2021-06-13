import { useState, useCallback, useEffect, useRef } from 'react';

export const usePaginatedFlatListData = ({ url, itemsLimit = 5, initialPage = 1 }) => {
  const page = useRef(initialPage);
  const forceRefetch = useRef({});
  const preventDoubleFetchingMore = useRef(false);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = useCallback(async () => {
    const newData = await fetch(`${url}/product?page=${page.current}&limit=${itemsLimit}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });
    const jsonNewData = await newData.json();

    if (isRefreshing) {
      setData(jsonNewData);
    } else {
      setData((prev) => [...prev, ...jsonNewData]);
    }

    setIsFetchingMore(false);
    setIsRefreshing(false);
    setIsLoading(false);

    preventDoubleFetchingMore.current = false;
  }, [isRefreshing, itemsLimit, url]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    page.current = 1;
    // Required to force an update if we are on the first page
    forceRefetch.current = {};
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.current, forceRefetch.current]);

  const fetchMore = useCallback(() => {
    if (preventDoubleFetchingMore.current) return;
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
