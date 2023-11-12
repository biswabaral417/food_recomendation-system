import { useState, useEffect } from 'react';

function useFetchData() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const getallfoods = async () => {
      try {
        const res = await fetch('/api/foodsdata', {
          method: 'GET'
        });
        const data = await res.json();

        if (!(res.status === 200)) {
          const error = new Error(res.error);
          throw error;
        } else {
          setJsonData(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getallfoods();
  }, []);

  return {
    jsonData
  };
}

export default useFetchData;
