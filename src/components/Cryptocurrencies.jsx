
import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
import ExtraCard from './ExtraCard';

const Cryptocurrencies = ({ simplified }) => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (cryptosList) {
      const quotes = cryptosList.finance.result[0].quotes;
      const filteredData = quotes.filter(item => {
        return (
          item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      // Filter further to include only the data where cryptoTradeable is false
      const filteredCryptos = filteredData.filter(item => !item.cryptoTradeable);
      setCryptos(filteredCryptos);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto" style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            xl={8}
            className="crypto-card"
            key={currency.symbol}
            style={{ marginBottom: '20px' }}
          >
            <Link to={`/stock/${currency.symbol}`}>
              <Card
                hoverable
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s',
                  background: '#f7f7f7',
                  height: '100%',
                }}
                bodyStyle={{ padding: '20px 24px' }}
              >
                <div>
                  <h3 style={{ marginBottom: '8px', fontSize: '18px', color: '#1890ff' }}>{currency.shortName}</h3>
                  <p style={{ marginBottom: '4px' }}>Symbol: {currency.symbol}</p>
                  <p style={{ marginBottom: '4px' }}>Price: {millify(currency.regularMarketPrice)}</p>
                  <p style={{ marginBottom: '4px' }}>Previous Close: {millify(currency.regularMarketPreviousClose)}</p>
                  <p style={{ marginBottom: '4px' }}>Exchange: {currency.exchange}</p>
                  <p style={{ marginBottom: '0' }}>Confidence: {currency.customPriceAlertConfidence}</p>
                  <p style={{ marginBottom: '0' }}>
                    Change: {currency.regularMarketChangePercent &&
                      millify(currency.regularMarketChangePercent)}%
                  </p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* <ExtraCard/> */}
    </>
  );
};

export default Cryptocurrencies;


































// import React, { useEffect, useState } from 'react';
// import millify from 'millify';
// import { Card, Row, Col, Input } from 'antd';
// import axios from 'axios';

// import { useGetCryptosQuery } from '../services/cryptoApi';
// import Loader from './Loader';

// const Cryptocurrencies = ({ simplified }) => {
//   const { data: cryptosList, isFetching } = useGetCryptosQuery();
//   const [cryptos, setCryptos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   // const [postMarketPrice, setPostMarketPrice] = useState(null);
//   // const [regularMarketPrice, setRegularMarketPrice] = useState(null);
//   // const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (cryptosList) {
//       const quotes = cryptosList.finance.result[0].quotes;
//       const filteredData = quotes.filter(item => {
//         return (
//           item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       });
//       const filteredCryptos = filteredData.filter(item => !item.cryptoTradeable);
//       setCryptos(filteredCryptos);
//     }
//   }, [cryptosList, searchTerm]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     setLoading(true);
//   //     const options = {
//   //       method: 'GET',
//   //       url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
//   //       params: {
//   //         symbol: 'SPY',
//   //         region: 'US'
//   //       },
//   //       headers: {
//   //         'X-RapidAPI-Key': 'd4a2ed61e1msh2055761a61bd28cp195de7jsne8414e3df1a6',
//   //         'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
//   //       }
//   //     };

//   //     try {
//   //       const response = await axios.request(options);
//   //       const { postMarketPrice, regularMarketPrice } = response.data.price;
//   //       setPostMarketPrice(postMarketPrice);
//   //       setRegularMarketPrice(regularMarketPrice);
//   //       console.log('API Response:', response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   if (isFetching ) return <Loader />;

//   return (
//     <>
//       {!simplified && (
//         <div className="search-crypto" style={{ marginBottom: '20px' }}>
//           <Input
//             placeholder="Search Cryptocurrency"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       )}
//       <Row gutter={[32, 32]} className="crypto-card-container">
//         {cryptos.map((currency) => (
//           <Col
//             xs={24}
//             sm={12}
//             lg={8}
//             xl={8}
//             className="crypto-card"
//             key={currency.symbol}
//             style={{ marginBottom: '20px' }}
//           >
//             <Card
//               hoverable
//               style={{
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                 transition: 'transform 0.3s',
//                 background: '#f7f7f7',
//                 height: '100%',
//               }}
//               bodyStyle={{ padding: '20px 24px' }}
//             >
//               <div>
//                 <h3 style={{ marginBottom: '8px', fontSize: '18px', color: '#1890ff' }}>{currency.shortName}</h3>
//                 <p style={{ marginBottom: '4px' }}>Symbol: {currency.symbol}</p>
//                 <p style={{ marginBottom: '4px' }}>Price: {millify(currency.regularMarketPrice)}</p>
//                 <p style={{ marginBottom: '4px' }}>Previous Close: {millify(currency.regularMarketPreviousClose)}</p>
//                 <p style={{ marginBottom: '4px' }}>Exchange: {currency.exchange}</p>
//                 <p style={{ marginBottom: '0' }}>Confidence: {currency.customPriceAlertConfidence}</p>
//                 <p style={{ marginBottom: '0' }}>
//                   Change: {currency.regularMarketChangePercent &&
//                     millify(currency.regularMarketChangePercent)}%
//                 </p>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

// <Row gutter={[32, 32]} justify="center">
//   <Col xs={24} sm={24} md={12} lg={8}>
//     <Card title="Stock Data" style={{ marginBottom: '20px' }}>
//       {typeof postMarketPrice === 'number' && (
//         <p>Post Market Price: {millify(postMarketPrice)}</p>
//       )}
//       {typeof regularMarketPrice === 'number' && (
//         <p>Regular Market Price: {millify(regularMarketPrice)}</p>
//       )}
//     </Card>
//   </Col>
// </Row>

//     </>
//   );
// };

// export default Cryptocurrencies;

















// import React, { useEffect, useState } from 'react';
// import millify from 'millify';
// import { Link } from 'react-router-dom';
// import { Card, Row, Col, Input } from 'antd';

// import { useGetCryptosQuery } from '../services/cryptoApi';
// import Loader from './Loader';

// const Cryptocurrencies = ({simplified}) => {
//   const count = simplified ? 10 : 100;
//   const { data: cryptosList, isFetching } = useGetCryptosQuery();
//   const [cryptos, setCryptos] = useState();
//   const [searchTerm, setSearchTerm] = useState('');

//   console.log(cryptosList)    

//   useEffect(() => {
//     setCryptos(cryptosList?.data?.coins);

//     const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

//     setCryptos(filteredData);
//   }, [cryptosList, searchTerm]);

//   if (isFetching) return <Loader />;

//   return (
//     <>
//     <h2>h2 working</h2>
//     {/*  */}

//     {!simplified && (
//         <div className="search-crypto">
//           <Input
//             placeholder="Search Cryptocurrency"
//             onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//           />
//         </div>
//       )}
//       <Row gutter={[32, 32]} className="crypto-card-container">
//         {cryptos?.map((currency) => (
//           <Col
//             xs={24}
//             sm={12}
//             lg={6}
//             className="crypto-card"
//             key={currency.uuid}
//           >

         
//             <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
//               <Card
//                 title={`${currency.rank}. ${currency.name}`}
//                 extra={<img className="crypto-image" src={currency.iconUrl} />}
//                 hoverable
//               >
//                 <p>Price: {millify(currency.price)}</p>
//                 <p>Market Cap: {millify(currency.marketCap)}</p>
//                 <p>Daily Change: {currency.change}%</p>
//               </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default Cryptocurrencies;


  