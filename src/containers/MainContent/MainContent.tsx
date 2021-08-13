import React, { useState } from 'react';
import './MainContent.scss';
import prayers, { PrayersObj, id } from '../../assets/constants/prayersNames';
import timerHeaderText from '../../assets/constants/timerHeader';
import { ReactComponent as GearIcon } from '../../assets/images/gear-fill.svg';
import { dayCheckList } from '../../assets/constants/types';
type prop = {
  lang: 'ar' | 'en';

  settingsHandler: (flag: boolean) => void;
  checkListHandler: (id: string, state: boolean) => void;
  dayCheckList: dayCheckList;
  nextPrayer: ['Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha', string];
};

const onSelection = () => {};

const MainContent: React.FC<prop> = ({
  lang,
  settingsHandler,
  checkListHandler,
  dayCheckList,
  nextPrayer,
}) => {
  return (
    <div className="App-body">
      <div className="app-header w-100">
        <div
          className="settings-icon"
          onClick={() => {
            settingsHandler(true);
          }}
        >
          <GearIcon />
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
            {prayers.map((prayer) => {
              return (
                <li>
                  {prayer[lang]}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={dayCheckList[prayer.id]}
                    onChange={(e) => {
                      checkListHandler(prayer.id, e.target.checked);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="d-flex w-100 flex-column timer-container">
          <div className="timer-header">
            {timerHeaderText[lang]}{' '}
            <span>{PrayersObj[nextPrayer[0]][lang]}</span>
          </div>
          <div className="timer-content">
            {nextPrayer[1].split(' ')[0]}{' '}
            <span> {nextPrayer[1].split(' ')[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
