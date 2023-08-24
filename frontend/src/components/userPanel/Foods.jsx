import React, { useContext } from 'react';
import CombinedContext from '../../contexts/CombinedContext';
import Card from './Card';

export default function Foods() {
    const { jsonData, mode, searchStr, viewData,itemToView, addToCart, ucart, Modal, } = useContext(CombinedContext);

    const cartItemCounts = ucart.reduce((counts, item) => {
        counts[item.itemName] = (counts[item.itemName] || 0) + 1;
        return counts;
    }, {});

    const filteredResults = jsonData.filter((food) =>
        food.itemName.toLowerCase().includes(searchStr.toLowerCase())
    );

    return (
        <>
        {
            itemToView !=="" &&
            <Modal />
        }
       
            {searchStr !== "" && (
                <h2 className='text-center'>Search Results</h2>
            )}
            <div className='container text-center foodgrid'>
                {filteredResults.map((food, index) => (
                    <Card
                        key={index}
                        mode={mode}
                        food={food}
                        viewData={viewData}
                        addToCart={addToCart}
                        cartItemCount={cartItemCounts[food.itemName] || 0}
                    />
                ))}
            </div>
        </>
    );
}
