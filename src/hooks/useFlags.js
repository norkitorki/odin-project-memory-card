import { useState, useEffect } from 'react';
import countryData from '../assets/static/countryData';

export default function useFlags() {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    (() => {
      Promise.all(
        countryData.map(async (country) => {
          try {
            const flag = await import(`../assets/flags/${country.id}.svg`);
            const image = { src: flag.default, alt: `${country.text} flag` };
            return { ...country, image };
          } catch (error) {
            console.error(`${country.text} flag was not imported:`, error);
            return { ...country, image: {} };
          }
        })
      ).then((res) => setFlags(res));
    })();
  }, []);

  return flags;
}
