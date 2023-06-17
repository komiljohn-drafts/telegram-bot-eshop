import { useEffect, useState } from "react";

export default function useFetchGet(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data ?? []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [data, isLoading];
}
