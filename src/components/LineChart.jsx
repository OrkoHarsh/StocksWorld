import React from 'react';
import { Line } from 'react-chartjs-2';
import { Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinName, coinHistory }) => {
  const selectedCoinHistory = coinHistory[coinName]; // Use the "AAPL" coin data

  console.log(selectedCoinHistory);
  console.log(selectedCoinHistory.timestamp);

  if (!selectedCoinHistory || !selectedCoinHistory.timestamp) {
    return <div>No data available</div>;
  }

  const coinTimestamp = selectedCoinHistory.timestamp.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString());
  const coinPrice = selectedCoinHistory.close;

  const chartData = {
    labels: coinTimestamp,
    datasets: [{
      label: `Price In USD for ${coinName}`,
      data: coinPrice,
      fill: false,
      backgroundColor: '#0071bd',
      borderColor: '#0071bd',
    }]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
      </Row>
      <Line data={chartData} options={options} />
    </>
  );
};

export default LineChart;





















// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Col, Row, Typography } from 'antd';
// import axios from 'axios';

// const { Title } = Typography;

// const LineChart = ({ coinId }) => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-spark', {
//           params: {
//             symbols: coinId,
//             interval: '1m',
//             range: '1d'
//           },
//           headers: {
//             'X-RapidAPI-Key': 'd4a2ed61e1msh2055761a61bd28cp195de7jsne8414e3df1a6',
//             'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
//           }
//         });

//         const coinData = response.data[coinId];
//         const coinTimestamp = coinData.timestamp.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString());
//         const coinPrice = coinData.close;

//         setChartData({
//           labels: coinTimestamp,
//           datasets: [{
//             label: 'Price In USD',
//             data: coinPrice,
//             fill: false,
//             backgroundColor: '#0071bd',
//             borderColor: '#0071bd',
//           }]
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [coinId]);

//   const options = {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true,
//         },
//       }],
//     },
//   };

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">{coinId} Price Chart </Title>
//       </Row>
//       {chartData && <Line data={chartData} options={options} />}
//     </>
//   );
// };

// export default LineChart;






// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Col, Row, Typography } from 'antd';

// const { Title } = Typography;

// const LineChart = ({ coinHistory, currentPrice, coinName }) => {
//   const coinPrice = [];
//   const coinTimestamp = [];

//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinPrice.push(coinHistory?.data?.history[i].price);
//   }

//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
//   }
//   const data = {
//     labels: coinTimestamp,
//     datasets: [
//       {
//         label: 'Price In USD',
//         data: coinPrice,
//         fill: false,
//         backgroundColor: '#0071bd',
//         borderColor: '#0071bd',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">{coinName} Price Chart </Title>
//         <Col className="price-container">
//           <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
//           <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
//         </Col>
//       </Row>
//       <Line data={data} options={options} />
//     </>
//   );
// };

// export default LineChart;
