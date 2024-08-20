// src/hooks/useLoading.js
import { useState, useEffect } from 'react';

const useLoading = (delay = 2000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [delay]);

  return loading;
};

export default useLoading;
