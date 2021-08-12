import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import prayers from './assets/constants/prayersNames';
import timerHeaderText from './assets/constants/timerHeader';
import MainContent from './containers/MainContent/MainContent';
import Settings from './containers/Settings/Settings';
function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('en');
  const [isSettings, setSettings] = useState(false);
  const [city, setCity] = useState('Alexandria');
  const langHandler = (lang: 'ar' | 'en') => {
    setLang(lang);
  };

  const settingsHandler = (flag: boolean) => {
    setSettings(flag);
  };
  return (
    <div className="App">
      {isSettings ? (
        <Settings
          lang={lang}
          settingsHandler={settingsHandler}
          langHandler={langHandler}
          city={city}
          setCity={setCity}
        />
      ) : (
        <MainContent lang={lang} settingsHandler={settingsHandler} />
      )}
    </div>
  );
}

export default App;
