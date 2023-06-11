import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [apiData, setAPIData] = useState(); //what do we want to get here?
  const [character, setCharacter] = useState('');

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=15${
          character ? '&character=' + character : ''
        }`
      );
      setAPIData(data);
    } catch (error) {
      console.log(error);
    }
  }, [character]); //[getData] shows that this is dependent on character changes

  console.log(apiData, character);

  useEffect(() => {
    getData();
  }, [getData]); //[getData] shows that this is dependent on getData changes

  const onInput = (e) => {
    const { value } = e.target;
    if (value.includes('fck')) {
      //adding an input check
      setCharacter('***');
      return;
    }

    setCharacter(e.target.value);
  };

  if (apiData && console.log(apiData));

  if (!apiData) return <h1>Loading</h1>;

  return (
    <div>
      <input
        type="text"
        id="characterInput"
        value={character}
        onInput={onInput}
      ></input>
      <p> {character}</p>

      {apiData.map((item) => {
        return (
          <>
            <div>{item.character}</div>
            <div>{item.quote}</div>
          </>
        );
      })}
    </div>
  );
};

export default App;
