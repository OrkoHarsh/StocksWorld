import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Col, Select } from 'antd';
import { useGetCoinDataQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';


const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data: coinData, isLoading, isError } = useGetCoinDataQuery(coinId,timeperiod);
  
  const time = ['1d', '5d', '3mo', '6mo', '1y','5y','max'];

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {isError.message}</div>;
  console.log('coinData:', coinData);
  console.log('coinData?.data:', coinData?.data);
  console.log('coinData?.data?.history:', coinData?.data?.history);

  return (
    <Col className="coin-detail-container">
      <Select
        defaultValue="1d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>

      <LineChart coinName={coinId} coinHistory={coinData} />
    </Col>
  );
};

export default CryptoDetails;
