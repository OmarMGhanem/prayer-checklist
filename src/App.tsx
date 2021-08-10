import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import prayers from './assets/constants/prayersNames';
import timerHeaderText from './assets/constants/timerHeader';
function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('en');

  const langHandler = (lang: 'ar' | 'en') => {
    setLang(lang);
  };
  return (
    <div className="App">
      <div className="App-body">
        <div className="app-header w-100">
          <div className="lang-selector">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="ar"
              checked={lang === 'ar' ? true : false}
              onClick={() => {
                langHandler('ar');
              }}
            />
            <label
              className="btn btn-sm btn-outline-success ar-button"
              htmlFor="ar"
            >
              AR
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="en"
              checked={lang === 'en' ? true : false}
              onClick={() => {
                langHandler('en');
              }}
            />
            <label
              className="btn btn-sm btn-outline-success en-button"
              htmlFor="en"
            >
              EN
            </label>
          </div>
          <div className="d-flex  align-items-baseline ">
            <div className="prayer-head">Prayers</div>
            <div className="checklist-head">Checklist</div>
          </div>
        </div>
        <div
          className="app-content d-flex w-100"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="check-list-container d-flex  w-100">
            <ul d-flex flex-column>
              {prayers[lang].map((prayers) => {
                return (
                  <li>
                    {prayers}
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="d-flex w-100 flex-column timer-container">
            <div className="timer-header">
              {timerHeaderText[lang]} <span>{'PLACEHOLDER'}</span>{' '}
            </div>
            <div className="timer-content">
              3:47 <span>AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
