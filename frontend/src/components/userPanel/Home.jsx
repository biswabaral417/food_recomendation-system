import React from 'react';
import CombinedContext from '../../contexts/CombinedContext';
import { useContext,useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

// Adjust the path accordingly

let season = "";
const findSeason = () => {
  let date = new Date();
  let month = date.getMonth();
  if (month >= 1 && month <= 6) {
    season = "Summer";
  } else if (month >= 7 && month <= 12) {
    season = "Winter";
  } else {
    season = "Invalid month";
  }
}
findSeason();

export default function Home({userType}) {
  const navigate=useNavigate();

  
  useEffect(() => {
    if (userType === 'admin') {
      navigate('/admin');
    }
  }, [userType, navigate]);

  
  const {
    jsonData,
    mode,
    addToCart,
    viewData,
    Modal,
    itemToView,
  } = useContext(CombinedContext);

  return (
    <>
      {
        itemToView !== "" &&
        <Modal />
      }
   

      <h1 className='text-center m-3'>Recommended this season</h1>
      <div className='container text-center foodgrid'>
        {jsonData.map((item, i) => {
          if (item.rSeasons === season) {
            return (
              <Card
                key={i}
                mode={mode}
                food={item}
                viewData={viewData}
                addToCart={addToCart}

              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}
