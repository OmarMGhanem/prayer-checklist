import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import apiService from './utils/apiService';
import prayers from './assets/constants/prayersNames';
import timerHeaderText from './assets/constants/timerHeader';
import MainContent from './containers/MainContent/MainContent';
import Settings from './containers/Settings/Settings';
import { getStoredData, setStoredData } from './utils/storage';
import { async } from 'q';
function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isSettings, setSettings] = useState(false);
  const [city, setCity] = useState('Alexandria');
  const langHandler = (lang: 'ar' | 'en') => {
    setLang(lang);
    setStoredData('lang', lang);
  };

  const settingsHandler = (flag: boolean) => {
    setSettings(flag);
  };

  const cityHandler = (city: string) => {
    setCity(city);
    setStoredData('city', city);
  };

  useEffect(() => {
    checkForLang();
    checkForCity();
  }, []);

  const checkForLang = async () => {
    try {
      const tempLang = await getStoredData('lang');

      if (tempLang && (tempLang === 'en' || tempLang === 'ar')) {
        setLang(tempLang);
      } else {
        await setStoredData('lang', lang);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkForCity = async () => {
    try {
      const tempCity: any = await getStoredData('city');

      if (tempCity) {
        setCity(tempCity);
      } else {
        await setStoredData('city', city);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      {isSettings ? (
        <Settings
          lang={lang}
          settingsHandler={settingsHandler}
          langHandler={langHandler}
          city={city}
          setCity={cityHandler}
        />
      ) : (
        <MainContent lang={lang} settingsHandler={settingsHandler} />
      )}
    </div>
  );
}

export default App;
