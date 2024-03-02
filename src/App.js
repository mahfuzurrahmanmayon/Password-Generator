import React, { useRef, useState } from "react";

function App() {
  // All inital states
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [strength, setStrength] = useState("Weak");
  const [uppercaseChecked, setUppercaseChecked] = useState(false);
  const [lowercaseChecked, setLowercaseChecked] = useState(false);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [specialCharsChecked, setSpecialCharsChecked] = useState(false);

  const inputRef = useRef(null);
  const inputCopyToCopied = useRef("Copy")


  // Array of letters
  const letters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    specialChars: "!@#$%^&*()_+{}[]|\\:;\"'<>,.?/",
  };

  // handle password length
  const handlePasswordLength = (e) => {
    setPasswordLength(e.target.value);
  };

  // Checkbox Toggle Feature
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case "uppercase":
        setUppercaseChecked(checked);
        break;
      case "lowercase":
        setLowercaseChecked(checked);
        break;
      case "numbers":
        setNumbersChecked(checked);
        break;
      case "specialChars":
        setSpecialCharsChecked(checked);
        break;
      default:
        break;
    }
  };

  // handleRefresh Password Generate
  const handleRefreshPassword = () => {
    let chars = "";
    // if all checkbox is false it return empty string and clear previous password after refresh
    if (
      !uppercaseChecked &&
      !lowercaseChecked &&
      !numbersChecked &&
      !specialCharsChecked
    ) {
      return chars === "" && setPassword("");
    }
    // uppercase,lowercase,numbers and special char if true
    if (uppercaseChecked) chars += letters.uppercase;
    if (lowercaseChecked) chars += letters.lowercase;
    if (numbersChecked) chars += letters.numbers;
    if (specialCharsChecked) chars += letters.specialChars;

    // empty New Password
    let newPassword = "";
    // random generate chars
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    // set the new password in setPassword function
    setPassword(newPassword);
    strengthPassword();
  };

  // Strength Password Function
  const strengthPassword = () => {
    if (uppercaseChecked && lowercaseChecked) {
      if (numbersChecked && specialCharsChecked) {
        setStrength("Strong");
      } else if (numbersChecked) {
        setStrength("Medium");
      } else {
        setStrength("Weak");
      }
    } else {
      setStrength("");
    }
  };

  // Copy the Password
  const passwordCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
    if(inputCopyToCopied.current){
      inputCopyToCopied.current.innerHTML = `<img
      src="data:image/svg+xml,%3csvg%20width='20'%20height='24'%20viewBox='0%200%2020%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.75'%20y='0.75'%20width='14.5'%20height='18.5'%20rx='3.25'%20stroke='black'%20stroke-width='1.5'/%3e%3crect%20x='4.75'%20y='4.75'%20width='14.5'%20height='18.5'%20rx='3.25'%20fill='black'%20stroke='black'%20stroke-width='1.5'/%3e%3c/svg%3e"
      alt="copy password"
    />
    Copied`
    }

    setTimeout(() => {
      inputCopyToCopied.current.innerHTML = `<img
        src="data:image/svg+xml,%3csvg%20width='20'%20height='24'%20viewBox='0%200%2020%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.75'%20y='0.75'%20width='14.5'%20height='18.5'%20rx='3.25'%20stroke='black'%20stroke-width='1.5'/%3e%3crect%20x='4.75'%20y='4.75'%20width='14.5'%20height='18.5'%20rx='3.25'%20fill='black'%20stroke='black'%20stroke-width='1.5'/%3e%3c/svg%3e"
        alt="copy password"
      />
      Copy`;
    }, 1000);
    
  }


  return (
    <div className="password-wrapper">
      <div className="gif">
        <img
          src="https://reactjs-password-generator.vercel.app/assets/password-4w9h2nKz.gif"
          alt=""
        />
      </div>
      <div className="password-title-box">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="sub-title">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input
            type="text"
            ref={inputRef}
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly
          />
          <div onClick={handleRefreshPassword}>
            <img
              src="data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15%2028.4375C8.49998%2028.4375%203.22498%2023.15%203.22498%2016.6625C3.22498%2010.175%208.49998%204.875%2015%204.875C16.3375%204.875%2017.6375%205.0625%2018.8875%205.45C19.3875%205.6%2019.6625%206.125%2019.5125%206.625C19.3625%207.125%2018.8375%207.4%2018.3375%207.25C17.275%206.925%2016.15%206.75%2015%206.75C9.53748%206.75%205.09998%2011.1875%205.09998%2016.65C5.09998%2022.1125%209.53748%2026.55%2015%2026.55C20.4625%2026.55%2024.9%2022.1125%2024.9%2016.65C24.9%2014.675%2024.325%2012.775%2023.2375%2011.15C22.95%2010.725%2023.0625%2010.1375%2023.5%209.85C23.925%209.5625%2024.5125%209.675%2024.8%2010.1125C26.1%2012.05%2026.7875%2014.3125%2026.7875%2016.6625C26.775%2023.15%2021.5%2028.4375%2015%2028.4375Z'%20fill='black'/%3e%3cpath%20d='M20.1625%207.5875C19.9%207.5875%2019.6375%207.475%2019.45%207.2625L15.8375%203.1125C15.5%202.725%2015.5375%202.125%2015.925%201.7875C16.3125%201.45%2016.9125%201.4875%2017.25%201.875L20.8625%206.025C21.2%206.4125%2021.1625%207.0125%2020.775%207.35C20.6125%207.5125%2020.3875%207.5875%2020.1625%207.5875Z'%20fill='black'/%3e%3cpath%20d='M15.95%2010.6625C15.6625%2010.6625%2015.375%2010.525%2015.1875%2010.275C14.8875%209.86251%2014.975%209.27501%2015.3875%208.96251L19.6%205.88751C20.0125%205.57501%2020.6%205.67501%2020.9125%206.08751C21.225%206.50001%2021.125%207.08751%2020.7125%207.40001L16.5%2010.4875C16.3375%2010.6125%2016.15%2010.6625%2015.95%2010.6625Z'%20fill='black'/%3e%3c/svg%3e"
              alt=""
            />
          </div>
        </div>
        <button className="copy-btn" ref={inputCopyToCopied} onClick={passwordCopy}>
          <img
            src="data:image/svg+xml,%3csvg%20width='20'%20height='24'%20viewBox='0%200%2020%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.75'%20y='0.75'%20width='14.5'%20height='18.5'%20rx='3.25'%20stroke='black'%20stroke-width='1.5'/%3e%3crect%20x='4.75'%20y='4.75'%20width='14.5'%20height='18.5'%20rx='3.25'%20fill='black'%20stroke='black'%20stroke-width='1.5'/%3e%3c/svg%3e"
            alt="copy password"
          />
          Copy
        </button>
      </div>
      <span
        className={
          strength === "Weak"
            ? "danger fw-500"
            : strength === "Medium"
            ? "warning fw-500"
            : "success fw-500"
        }
      >
        {strength}
      </span>
      <div className="slider">
        <div>
          <div className="slider-label">Password Length:</div>
          <span>{passwordLength}</span>
        </div>
        <div className="slider-input">
          <input
            type="range"
            value={passwordLength}
            min="0"
            max="30"
            onChange={handlePasswordLength}
          />
        </div>
      </div>
      <div className="elements">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="uppercase"
            name="uppercase"
            checked={uppercaseChecked}
            onChange={handleCheckbox}
          />
          <label for="uppercase">Uppercase</label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="lowercase"
            name="lowercase"
            checked={lowercaseChecked}
            onChange={handleCheckbox}
          />
          <label for="lowercase">Lowercase</label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="numbers"
            name="numbers"
            checked={numbersChecked}
            onChange={handleCheckbox}
          />
          <label for="numbers">Numbers</label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="special chars"
            name="specialChars"
            checked={specialCharsChecked}
            onChange={handleCheckbox}
          />
          <label for="special chars">Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
