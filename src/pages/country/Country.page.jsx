import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { ChartWrapper } from './Country.styles';

const Country = ({ match }) => {
  const { country } = match.params;
  const [ confirmedData, setConfirmedData ] = useState();
  const [ deathData, setDeathData ] = useState();
  const [ recoveredData, setRecoveredData ] = useState();
  const [ activeData, setActiveData ] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.covid19api.com/dayone/country/${country}`)
        const deaths = [];
        const confirmed = [];
        const recovered = [];
        const active = [];

        response.data.forEach(day => {
          confirmed.push({x: day.Date, y: day.Confirmed})
          active.push({x: day.Date, y: day.Active})
          // deaths.push({x: day.Date, y: day.Deaths})

          // recovered.push({x: day.Date, y: day.Recovered})
        })

        setConfirmedData(confirmed);
        setDeathData(deaths);
        setRecoveredData(recovered);
        setActiveData(active);
      }
      catch(e) {
        console.log(e);
      }
    }

    fetchData();
  }, [country])

  if (!confirmedData || !deathData || !recoveredData || !activeData) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <title>{country} Statistics</title>
      </Helmet>
      <h1>{country}</h1>

      <ChartWrapper>
        <Chart 
          type="line"
          series={[
            {
              name: 'Confirmed',
              data: [...confirmedData]
            },
            {
              name: 'Active',
              data: [...activeData]
            }
          ]}
          options={
            {
              xaxis: {
                type: 'datetime'
              }, 
              title: {
                text: 'Confirmed and Active Cases',
                align: 'center'
              }
            }
          }
        />
      </ChartWrapper>
      
    </div>
  )
}

export default Country;