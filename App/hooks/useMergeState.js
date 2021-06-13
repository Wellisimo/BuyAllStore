import { useState } from 'react';

const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const setMergedState = (data) => setState((prevState) => ({ ...prevState, ...data }));
  return [state, setMergedState];
};

export default useMergeState;
