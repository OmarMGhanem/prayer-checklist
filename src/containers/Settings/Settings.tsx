import React, { useEffect, useState, useRef } from 'react';
import apiService from './../../utils/apiService';
import { city } from '../../assets/constants/types';
import './Settings.scss';
import settingsText from '../../assets/constants/settingsText';
type prop = {
  lang: 'ar' | 'en';
  langHandler: (lang: 'ar' | 'en') => void;
  settingsHandler: (flag: boolean) => void;
  city: string;
  setCity: (city: string) => void;
};

const Settings: React.FC<prop> = ({
  lang,
  langHandler,
  settingsHandler,
  city,
  setCity,
}) => {
  const [cites, setCites] = useState<city[]>([]);
  const [query, setQuery] = useState('');

  const searchHandler = async (q: string) => {
    if (!q) {
      setCites([]);
      return;
    }

    if (cites.some((s: city) => s.cityCode == q)) {
      console.log('Selection, Do  change city ');
      setCites([]);
      setCity(q);
      return;
    }

    try {
      const citiesList = await getCities(q);
      setCites(citiesList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => searchHandler(query), 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const getCities = async (city: string) => {
    try {
      const res = await apiService.getCites(city);
      return res?.data;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="Settings-body">
      <div className="Settings-header w-100">
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
        className="city-selection d-flex w-100"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="d-flex flex-column p-3">
          <label htmlFor="search">{settingsText.searchCity[lang]}</label>
          <input
            list="searchList"
            id="search"
            name="search"
            placeholder={city}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <datalist id="searchList">
            {cites.map((searchCity: city) => {
              return (
                <option value={searchCity.cityCode}>
                  {searchCity.cityName} ,{searchCity.countryName}
                </option>
              );
            })}
          </datalist>
        </div>

        <div className="currentCityText">
          {settingsText.currentCity[lang]} <span>{city}</span>
        </div>

        {/**         <div>
          <div className="city-text">{settingsText.choseCity[lang]} :</div>
          <select
            value={city}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              console.log('City selected ', e.target.value);
              setCity(e.target.value);
            }}
          >
            <option selected disabled>
              {settingsText.choseCity[lang]}
            </option>
            {cites.map((city) => {
              return <option value={city}>{city}</option>;
            })}
          </select>
        </div>*/}
      </div>
      <div
        className="Settings-footer w-100"
        onClick={() => {
          settingsHandler(false);
        }}
      >
        {/*
             <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            console.log('Saving Settings');
            settingsHandler(false);
          }}
        >
          {settingsText.save[lang]}
        </button>
        
        */}
        {settingsText.back[lang]}
      </div>
    </div>
  );
};

export default Settings;
