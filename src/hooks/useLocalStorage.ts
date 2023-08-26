import { useState } from 'react';

export const useLocalStorage = () => {

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    const newValue = localStorage.getItem(key);
    return newValue;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};
