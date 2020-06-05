import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loader from 'react-loader-spinner';

// icon imports
import { 
  LocalHospitalOutlined, 
  SentimentDissatisfiedOutlined, 
  SentimentSatisfiedOutlined } from '@material-ui/icons';

import InfoCard from '../../components/info-card/InfoCard.component';
import { ChartWrapper } from './Country.styles';

import { capitalize } from '../../utils/text.utils';

const Country = ({ match }) => {
  const { country } = match.params;

  const [ isLoading, setIsLoading ] = useState(true);
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
          deaths.push({x: day.Date, y: day.Deaths})

          recovered.push({x: day.Date, y: day.Recovered})
        })

        setConfirmedData(confirmed);
        setDeathData(deaths);
        setRecoveredData(recovered);
        setActiveData(active);
      }
      catch(e) {
        console.log(e);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [country])

  if (isLoading) {
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        visible={isLoading}
      />
    )
  }

  return (
    <div>
      <Helmet>
        <title>{capitalize(country)} Statistics</title>
      </Helmet>
      
      <h1>{capitalize(country)}</h1>

      <InfoCard
        status="Confirmed"
        count={confirmedData[confirmedData.length - 1].y}
        backgroundColor="#78909C"
        icon={LocalHospitalOutlined}
      />
      <InfoCard
        status="Deaths"
        count={deathData[deathData.length - 1].y}
        backgroundColor="#EF5350"
        icon={SentimentDissatisfiedOutlined}
      />
      <InfoCard
        status="Recovered"
        count={recoveredData[recoveredData.length - 1].y}
        backgroundColor="#66BB6A"
        icon={SentimentSatisfiedOutlined}
      />

      <ChartWrapper>
        <Chart 
          height={350}
          type="line"
          series={[
            {
              name: 'Confirmed',
              data: [...confirmedData]
            }
          ]}
          options={
            {
              xaxis: {
                type: 'datetime'
              }, 
              title: {
                text: 'Confirmed Cases',
                align: 'center'
              },
            }
          }
        />
        <Chart
          height={350}
          type="line"
          series={[
            {
              name: 'Deaths',
              data: [...deathData]
            },
            {
              name: 'Recovered',
              data: [...recoveredData]
            },
            {
              name: 'Active',
              data: [...activeData]
            }
          ]}
          options={
            {
              colors: ['#EF5350', '#66BB6A', '#29B6F6'],
              xaxis: {
                type: 'datetime'
              }, 
              title: {
                text: 'Total',
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