import React, { useState, Component, useEffect} from 'react';

const MainContainer = () => {
  const getCards = async () => {
    let clist = await fetch('/getCards');
    clist = await clist.json();
    setList(clist);
  };

  const [totalCards, setCount] = useState(0);
  const [cardList, setList] = useState([]);

  getCards();
  console.log(cardList);

  // useEffect(() => {
  //   getCards();
  // });

  return(
    <div>
      <p>Total cards in collection: {totalCards}</p>
      <form method='POST' action='/submitCard'>
        <input name="cardName" type="text" placeholder="card name"></input>
        <input name="cardAmount" type="number"></input>
        <input type='submit' value='Add to collection'></input>
      </form>
      <ul className="allCards">
        {cardList.map((card) => {
          setCount(totalCards + card.cardCount);
          return <li>{card.cardName} - count: {card.cardCount}</li>;
        })}
      </ul>
    </div>
  )
};


export default MainContainer;