import './App.css';
import {useState, useEffect} from 'react';
const App = () => {
    const [value, setValue] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [submit, setSubmit] = useState(false);

    const changeInputValue = (e) => {
        setInputValue(value => value = e.target.value);
    }
    const changeValue = (num) => {
        setValue(value => value = num);
    }
    const toSubmit = (bool) => {
        setSubmit(bool);
    }
    
    const getRatio = async () => {
        const data = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
        const jsonData = await data.json();
        const USD = jsonData.Valute.USD.Value;
        return USD;
    }

    useEffect(() => {
        if(submit === false) {
            console.log(`didnt submit`);
        }
        else {
            const convertValue = async() => {
                const ratio = await getRatio();
                console.log(ratio);
                changeValue((inputValue/ratio).toFixed(2));
            }
            convertValue();
            toSubmit(false);
        }
    }, [submit]);

    return (
        <>
            <div className="screen">
                <div>
                    {value}
                </div>
            </div>
            <form className="input-container">
                <input onChange = {(e) => changeInputValue(e)} required="" placeholder="Put value" type="number"/>
                <button onClick = {() => toSubmit(true)} className="invite-btn" type="button">
                    Convert
                </button>
            </form>
        </>
    );
}
    
   
 export default App;
  
