import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [language, setLanguage] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const fetchData = async () => {
    const code = encodeURIComponent(input);
    const encodedLanguage = encodeURIComponent(language);
    const encodedInput = encodeURIComponent('7');

    const data = `code=${code}&language=${encodedLanguage}&input=${encodedInput}`;

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    };

    try {
      const response = await fetch('https://api.codex.jaagrav.in', config);
      const responseData = await response.json();
      setResult(JSON.stringify(responseData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelection = (e) => {
    setLanguage(e.target.value);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleRun = () => {
    if (language && input) {
      fetchData();
    }
  };

  return (
    <div>
      <select value={language} onChange={handleSelection}>
        <option value="">Select a language</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="go">GoLang</option>
        <option value="cs">C#</option>
        <option value="js">NodeJS</option>
      </select>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleRun}>Run</button>
      <div>Result: {result}</div>
    </div>
  );
};

export default MyComponent;
