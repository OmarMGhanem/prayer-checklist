import React, { useEffect } from 'react';
import apiService from './../../utils/apiService';

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
  let cites = ['Alexandria', 'cairo', 'portsaid'];

  useEffect(() => {
    getCities('alex');
  }, []);

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
      </div>
      <div className="Settings-footer w-100">
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
      </div>
    </div>
  );
};

export default Settings;
