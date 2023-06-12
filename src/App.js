import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { validate } from './validation';

const App = () => {
  const [apiData, setAPIData] = useState(); //what do we want to get here?
  const [character, setCharacter] = useState('');
  const [errors, setErrors] = useState(null); //null means no errors

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

  useEffect(() => {
    getData();
  }, [getData]); //[getData] shows that this is dependent on getData changes

  const onInput = async (e) => {
    const { value } = e.target;
    setCharacter(value);

    //validate
    const res = await validate(value);
    setErrors(res);

    console.log(character);
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
      <p>{errors}</p>
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
