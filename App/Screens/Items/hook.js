import { useState, useCallback, useEffect, useRef } from 'react';

const URL = 'https://api.shop.waf.com.ua/product';
const pageLimit = 5;

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const page = useRef(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = useCallback(async () => {
    const newData = await fetch(`${URL}?page=${page.current}&limit=${pageLimit}`);
    const jsonNewData = await newData.json();

    setData((prev) => [...prev, ...jsonNewData]);

    page.current += 1;
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    page.current = 1;
    const newData = await fetch(`${URL}?page=${page.current}&limit=${pageLimit}`);
    const jsonNewData = await newData.json();
    setData(jsonNewData);
    setIsRefreshing(false);
    page.current += 1;
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    getData();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMore = async () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    await getData();
    setIsFetchingMore(false);
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
