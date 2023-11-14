import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { ScorigamiMatrix } from '@/components';

export const highestScore = 73;
export const highestLosingScore = 51;

export default function Home({ }) {
  const testUrl = "http://localhost:3000/api/hello"
  const actualUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=2022";
  const [dataMatrix, setDataMatrix] = useState(JSON.parse(JSON.stringify(Array(highestLosingScore + 1).fill(JSON.parse(JSON.stringify(Array(highestScore + 1).fill(JSON.parse(JSON.stringify(Array(0))))))))));

  const scrollRef = useRef();

  const fetchData = async (route) => {
    const response = await fetch(route);
    const dataJson = await response.json();
    return dataJson;
  }

  useEffect(() => {
    const asyncCb = async () => {
      const d = await fetchData(testUrl);
      const copyMatrix = [...dataMatrix];
      d.forEach((ev) => {
        const [t1, t2] = [...ev.competitions[0].competitors];
        const [winningTeam, losingTeam] = Math.max(parseInt(t1.score), parseInt(t2.score)) === parseInt(t1.score) ? [t1, t2] : [t2, t1];
        copyMatrix[parseInt(losingTeam.score)][parseInt(winningTeam.score)].push([winningTeam, losingTeam]);
      });
      setDataMatrix(copyMatrix);
    };
    asyncCb();
  }, []);

  const handleScroll = (e) => {
    scrollRef.current.scrollLeft += e.deltaY / 2;
  };

  return (<>
    <div className="outer-wrapper">
      <h1>NFL Scorigami</h1>
      <div className="scroll-container" ref={scrollRef} onWheel={handleScroll}>
        <ScorigamiMatrix matrix={dataMatrix} />
      </div>
    </div>
  </>
  );
}
