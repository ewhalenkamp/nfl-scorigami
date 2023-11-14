import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ScorigamiMatrix } from '@/components';

export const highestScore = 73;
export const highestLosingScore = 51;

export default function Home({ }) {
  const [data, setData] = useState();
  const testUrl = "http://localhost:3000/api/hello"
  const actualUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=2023";
  const dataMatrix = Array(highestLosingScore + 1).fill([...Array(highestScore + 1).fill({ value: false })]);

  const fetchData = async (route) => {
    const response = await fetch(route);
    const dataJson = await response.json();
    return dataJson;
  }

  useEffect(() => {
    const asyncCb = async () => {
      const d = await fetchData(testUrl);
      console.log(d);
      setData(JSON.stringify(d, null, '\t'));
    };
    asyncCb();
  }, []);

  return (<>
    <div className="outer-wrapper">
      <h1>NFL Scorigami</h1>
      <ScorigamiMatrix matrix={dataMatrix} />
    </div>
  </>
  );
}
