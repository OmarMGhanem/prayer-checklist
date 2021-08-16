import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import apiService from './utils/apiService';
import { prayersID } from './assets/constants/prayersNames';
import timerHeaderText from './assets/constants/timerHeader';
import MainContent from './containers/MainContent/MainContent';
import Settings from './containers/Settings/Settings';
import { getStoredData, setStoredData } from './utils/storage';
import { compareTimes } from './utils/moment';
import { city, dayCheckList, dayData } from './assets/constants/types';

function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isSettings, setSettings] = useState(false);
  const [city, setCity] = useState('alexandria');
  const [nextPray, setNextPray] = useState<
    ['Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha', string]
  >(['Fajr', '03:40 AM']);
  const [dayCheckList, setCheckList] = useState<dayCheckList>({
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  });
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

  const checkListHandler = (prayId: string, state: boolean) => {
    setCheckList((oldState) => {
      return {
        ...oldState,
        [prayId]: state,
      };
    });
  };

  useEffect(() => {
    getPrayersTime(city);
  }, [city]);

  useEffect(() => {
    checkForLang();
    checkForCity();
    checkForChecklist();
    checkForDayData();
  }, []);

  useEffect(() => {
    setStoredData('dayCheckList', dayCheckList);
  }, [dayCheckList]);

  const clearCheckList = () => {
    setCheckList({
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false,
    });
  };

  const checkForLang = async () => {
    try {
      const tempLang = await getStoredData<string>('lang');

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
      const tempCity = await getStoredData<string>('city');

      if (tempCity) {
        setCity(tempCity);
      } else {
        await setStoredData('city', city);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkForChecklist = async () => {
    try {
      const checklist = await getStoredData<dayCheckList>('dayCheckList');

      if (checklist) {
        setCheckList(checklist);
      } else {
        setStoredData('dayCheckList', dayCheckList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkForDayData = async () => {
    try {
      const storedDayData = await getStoredData<dayData>('dayData');

      if (storedDayData) {
        const rawTodayTime = new Date();
        const timearray = rawTodayTime.toLocaleDateString().split('/');
        const todayTime =
          timearray[2] + '-' + timearray[0] + '-' + timearray[1];

        if (todayTime === storedDayData.date.gregorian) {
          // set next prayer logic
          getNextPryerId(storedDayData);
        } else {
          getPrayersTime(city);
          //clear checklist
          clearCheckList();
        }
      } else {
        getPrayersTime(city);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPrayersTime = async (city: string) => {
    const res = await apiService.getDayData(city);
    const dayData: dayData = res?.data.results.datetime[0];

    await setStoredData('dayData', dayData);
    getNextPryerId(dayData);
    // set next prayer logic
  };

  const getNextPryerId = (dayData: dayData) => {
    const localTime = new Date();
    const times = Object.entries(dayData.times);
    setNextPray(times[2] as typeof nextPray);
    const localHours = localTime.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    for (const time of times) {
      if (prayersID.includes(time[0])) {
        if (compareTimes(localHours, time[1])) {
          setNextPray(time as typeof nextPray);

          break;
        }
      }
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
        <MainContent
          lang={lang}
          settingsHandler={settingsHandler}
          checkListHandler={checkListHandler}
          dayCheckList={dayCheckList}
          nextPrayer={nextPray}
        />
      )}
    </div>
  );
}

export default App;
