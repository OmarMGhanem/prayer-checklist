import React, { useState } from 'react';
import './MainContent.scss';
import prayers from '../../assets/constants/prayersNames';
import timerHeaderText from '../../assets/constants/timerHeader';
import { ReactComponent as GearIcon } from '../../assets/images/gear-fill.svg';

type prop = {
  lang: 'ar' | 'en';

  settingsHandler: (flag: boolean) => void;
};

const MainContent: React.FC<prop> = ({ lang, settingsHandler }) => {
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
  );
};

export default MainContent;
