import { useEffect, useState, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

const useLazyQueryCallback = (query, func) => {
  const [getData, { data, called }] = useLazyQuery(query);
  const [variables, setVariables] = useState();
  const setData = useRef();

  const callQuery = useCallback(() => {
    getData({ variables });
    return func;
  }, [getData, variables, func]);

  const callFunc = useCallback(() => {
    const rootQuery = Object.keys(data)[0];
    func(data[rootQuery]);
  }, [data, func, query]);

  useEffect(() => {
    if (variables && !called) {
      setData.current = callQuery();
    }
    data && callFunc();
  }, [callQuery, callFunc, setData, data, called, variables]);

  return [setVariables];
};

export default useLazyQueryCallback;
