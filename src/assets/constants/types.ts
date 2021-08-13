export type city = {
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
};

export type dayData = {
  times: {
    Imsak: string;
    Sunrise: string;
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Midnight: string;
  };
  date: {
    timestamp: number;
    gregorian: string;
    hijri: string;
  };
};

export type PrayerWithTime = {
  id: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  time: string;
};

export type dayCheckList = {
  Fajr: boolean;
  Dhuhr: boolean;
  Asr: boolean;
  Maghrib: boolean;
  Isha: boolean;
};
