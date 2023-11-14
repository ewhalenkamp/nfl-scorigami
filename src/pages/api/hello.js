const sampleData = {
  events: [
    {
      competitions: [
        {
          competitors: [
            {
              homeAway: "home",
              id: "1",
              linescores: [],
              order: 0,
              records: [],
              score: "20",
              team: {
                id: "1",
                abbreviation: "ATL",
                displayName: "Atlanta Falcons",
                color: "000000",
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/atl.png",
                shortDisplayName: "Falcons",
              }
            },
            {
              homeAway: "away",
              id: "22",
              linescores: [],
              order: 1,
              records: [],
              score: "19",
              team: {
                id: "22",
                abbreviation: "ARI",
                color: "A40227",
                alternateColor: "ffffff",
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ari.png",
                shortDisplayName: "Cardinals"
              }
            }
          ]
        }
      ],
      date: "2023-01-01T18:00Z",
      id: "401437933",
      season: {
        year: 2022,
        type: 2,
        slug: "regular-season"
      },
      shortName: "ARI @ ATL",
      status: {
        clock: 0
      },
      uid: "s:20~l:28~e:401437933",
      week: {
        number: 17
      }
    }
  ],
  leagues: [

  ],
}

export default function handler(req, res) {
  res.status(200).json(sampleData);
}
