import React, { useState } from 'react'


function Code({ onDataUpdate, userInput, onRun }) {
    const [language, setLanguage] = useState('');
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [outputs, setOutputs] = useState('');
    const [rows, setRows] = useState('25')
    const [errors, setErrors] = useState("")
    
    const [code, setCode] = useState('');
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState('');
  
    const fetchData = async () => {
      const code = encodeURIComponent(input);
      const encodedLanguage = encodeURIComponent(language);
      const encodedInput = encodeURIComponent(userInput);
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
        setOutputs(responseData.output); 
        setErrors(responseData.error)
        onDataUpdate(responseData.error, responseData.output);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSelection = (e) => {
      setLanguage(e.target.value);
    };
  
    const handleInput = (e) => {
      setInput(e.target.value);
      const inputCode = e.target.value;
      setInput(inputCode);
  
      const lines = inputCode.split('\n');
      const lastLine = lines[lines.length - 1];
      const words = lastLine.trim().split(' ');
      const lastWord = words[words.length - 1];
      
      if(language === 'cpp') {
        const suggested = cpp.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }

      if(language === 'py') {
        const suggested = py.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }
      if(language === 'cs') {
        const suggested = cs.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }
      if(language === 'js') {
        const suggested = js.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }
      if(language === 'java') {
        const suggested = java.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }
      if(language === 'c') {
        const suggested = c.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }
      if(language === 'go') {
        const suggested = go.filter(keyword => keyword.startsWith(lastWord));
        setSuggestedKeywords(suggested);
      }
      
    };
  
    const handleRun = () => {
      if (language && input) {
        fetchData();
        onRun();
      }
    };
    // const handleUserInput = (e) => {
    //   setUserInput(e.target.value);
    // }
    // const handleKeyEvent = (event) => {
    //   if(event.key === 'Enter'){
    //     handleRun();
    //   }
    // }
  
    const renderList = (rows) => {
      const listItems = [];
      for (let i = 1; i < rows; i++) {
        listItems.push(<li key={i}>{i}</li>);
      }
      return listItems;
    };

  
  const handleSuggestionClick = (keyword) => {
    setSelectedKeyword(keyword);
    const lines = code.split('\n');
    const lastLine = lines[lines.length - 1];
    const words = lastLine.trim().split(' ');
    words[words.length - 1] = keyword;
    lines[lines.length - 1] = words.join(' ');
    const updatedCode = lines.join('\n');
    setInput(updatedCode);
  };
  const cpp = [
          'alignas', 'alignof', 'and', 'and_eq', 'asm', 'atomic_cancel', 'atomic_commit',
          'atomic_noexcept', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 'catch',
          'char', 'char8_t', 'char16_t', 'char32_t', 'class', 'compl', 'concept', 'const',
          'consteval', 'constexpr', 'constinit', 'const_cast', 'continue', 'co_await',
          'co_return', 'co_yield', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast',
          'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend',
          'goto', 'if', 'import', 'inline', 'int', 'long', 'module', 'mutable', 'namespace',
          'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private',
          'protected', 'public', 'reflexpr', 'register', 'reinterpret_cast', 'requires',
          'return', 'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast',
          'struct', 'switch', 'synchronized', 'template', 'this', 'thread_local', 'throw',
          'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using',
          'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq'
      ];    
      const py = [
        'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def',
        'del', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global',
        'if', 'import', 'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass',
        'raise', 'return', 'True', 'try', 'while', 'with', 'yield'
        ];
    
    const java = [
        'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
        'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
        'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
        'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package',
        'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp',
        'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
        'try', 'void', 'volatile', 'while'
        ];
    
    const c = [
        'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
        'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
        'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
        'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'
        ];
        
    const go = [
        'break', 'default', 'func', 'interface', 'select', 'case', 'defer', 'go',
        'map', 'struct', 'chan', 'else', 'goto', 'package', 'switch', 'const',
        'fallthrough', 'if', 'range', 'type', 'continue', 'for', 'import', 'return',
        'var'
        ];
        
    const cs = [
        'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char',
        'checked', 'class', 'const', 'continue', 'decimal', 'default', 'delegate',
        'do', 'double', 'else', 'enum', 'event', 'explicit', 'extern', 'false',
        'finally', 'fixed', 'float', 'for', 'foreach', 'goto', 'if', 'implicit',
        'in', 'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace',
        'new', 'null', 'object', 'operator', 'out', 'override', 'params', 'private',
        'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
        'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch',
        'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked',
        'unsafe', 'ushort', 'using', 'using static', 'void', 'volatile', 'while',
        'yield'
        ];
        
    const js = [
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for',
        'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return',
        'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'undefined',
        'var', 'void', 'while', 'with', 'yield'
      ];
  return (
      <div className='m-9 border-2 border-gega-green min-w-[900px] min-h-[700px]'>
        <div className='flex flex-row justify-between my-2'>
          <select value={language} onChange={handleSelection} className='ml-10 bg-gega-green border-none outline-none'>
            <option value="">Select a language</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">GoLang</option>
            <option value="cs">C#</option>
            <option value="js">NodeJS</option>
          </select>
          <button className='border-none bg-gega-green text-black mr-16 px-2 py-1 rounded-md' onClick={handleRun}>Run</button>
        </div>
        <div className='flex flex-row'>
          <div className='flex flex-col min-w-[30px] text-center text-gega-white'>
            {
              <ul>{renderList(rows)}</ul>
            }
          </div>
          <div className='bg-gega-light-black'>
            <textarea value={input} onChange={handleInput}  className='bg-gega-light-black text-gega-white pl-1' name="input" id="" cols="92" rows={rows}></textarea>
          </div>
          <div>
            <ul className='overflow-y-scroll h-[600px] text-gega-white mx-2 pr-2 border-y-1'>
              {suggestedKeywords.map((keyword, index) => (
                <li key={index} onClick={() => handleSuggestionClick(keyword)} className='border-0.5 border-t-0'>{keyword}</li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Code