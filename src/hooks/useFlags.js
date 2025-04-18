import { useState, useEffect } from 'react';

const countryData = [
  { id: 'at', text: 'Austria' },
  { id: 'be', text: 'Belgium' },
  { id: 'bg', text: 'Bulgaria' },
  { id: 'hr', text: 'Croatia' },
  { id: 'cy', text: 'Cyprus' },
  { id: 'cz', text: 'Czechia' },
  { id: 'dk', text: 'Denmark' },
  { id: 'ee', text: 'Estonia' },
  { id: 'fi', text: 'Finland' },
  { id: 'fr', text: 'France' },
  { id: 'de', text: 'Germany' },
  { id: 'gr', text: 'Greece' },
  { id: 'hu', text: 'Hungary' },
  { id: 'ie', text: 'Ireland' },
  { id: 'it', text: 'Italy' },
  { id: 'lv', text: 'Latvia' },
  { id: 'lt', text: 'Lithuania' },
  { id: 'lu', text: 'Luxembourg' },
  { id: 'mt', text: 'Malta' },
  { id: 'nl', text: 'Netherlands' },
  { id: 'pl', text: 'Poland' },
  { id: 'pt', text: 'Portugal' },
  { id: 'ro', text: 'Romania' },
  { id: 'sk', text: 'Slovakia' },
  { id: 'si', text: 'Slovenia' },
  { id: 'es', text: 'Spain' },
  { id: 'se', text: 'Sweden' },
];

export default function useFlags() {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    (() => {
      Promise.all(
        countryData.map(async (country) => {
          try {
            const flag = await import(`../assets/flags/${country.id}.svg`);
            return { ...country, image: flag.default };
          } catch (error) {
            console.error(error);
            return { ...country, image: null };
          }
        })
      ).then((res) => setFlags(res));
    })();
  }, []);

  return flags;
}
