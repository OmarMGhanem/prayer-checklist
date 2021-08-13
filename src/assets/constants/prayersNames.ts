export type id = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
type prayerType = {
  id: id;
  en: string;
  ar: string;
};

const prayers: prayerType[] = [
  { id: 'Fajr', en: 'Fajr', ar: 'فجر' },
  { id: 'Dhuhr', en: 'Dhuhr', ar: 'ظهر' },
  { id: 'Asr', en: 'Asr', ar: 'عصر' },
  { id: 'Maghrib', en: 'Maghrib', ar: 'مغرب' },
  { id: 'Isha', en: 'Isha', ar: 'عشاء' },
];

export const PrayersObj = {
  Fajr: { en: 'Fajr', ar: 'فجر' },
  Dhuhr: { en: 'Dhuhr', ar: 'ظهر' },
  Asr: { en: 'Asr', ar: 'عصر' },
  Maghrib: { en: 'Maghrib', ar: 'مغرب' },
  Isha: { en: 'Isha', ar: 'عشاء' },
};

export const prayersID = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
export default prayers;
