import { useState, useCallback, useEffect, useRef } from 'react';

const URL = 'https://api.shop.waf.com.ua/product';
const pageLimit = 2;

export const usePaginatedFlatListData = (url) => {
  const [data, setData] = useState([]);
  const page = useRef({ page: 1 });
  const preventDoubleFetchingMore = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = async () => {
    const newData = await fetch(`${URL}?page=${page.current.page}&limit=${pageLimit}`);
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
  };

  const refresh = async () => {
    setIsRefreshing(true);
    page.current = { page: 1 };
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.current]);

  const fetchMore = () => {
    if (preventDoubleFetchingMore.current || isLoading) return;
    page.current = { page: page.current.page + 1 };
    preventDoubleFetchingMore.current = true;
    setIsFetchingMore(true);
  };

  return {
    data,
    isLoading,
    isRefreshing,
    isFetchingMore,
    fetchMore,
    refresh,
  };
};
