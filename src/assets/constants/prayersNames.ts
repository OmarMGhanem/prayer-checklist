type prayerType = {
  id: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
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

export default prayers;
