import React from "react";
export function useLoading() {
  const [
    loadState,
    setLoadState
  ] = React.useState<LoadStatesType>('LOADING');

  const onSussess = () => setLoadState('COMPLETED');
  const onFailed = () => setLoadState('FAILED');
  const onStart = () => setLoadState('LOADING');

  const isLoad = loadState === 'LOADING';
  const isFailed = loadState === 'FAILED';
  
  return {
    onStart, 
    onSussess, 
    onFailed, 
    isFailed, 
    isLoad, 
    loadState, 
    setLoadState 
  }
}