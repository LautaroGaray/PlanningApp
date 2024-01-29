import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UseFetch = ({ url, method, initialData = null }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {       
        const response = await axios({
          method: method,
          url: url,
        });

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

      
    };

    fetchData();
  }, [url, method]);

  return { data, loading, error };
};

export default UseFetch;
