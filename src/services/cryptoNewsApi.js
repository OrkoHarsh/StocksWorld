import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const yahooFinanceHeaders = {
  'x-rapidapi-key': 'd4a2ed61e1msh2055761a61bd28cp195de7jsne8414e3df1a6',
  'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
};

const createRequest = (region) => ({
  url: '/news/v2/list',
  method: 'POST',
  headers: yahooFinanceHeaders,
  params: {
    region: region,
    snippetCount: '28'
  }
});

export const cryptoNewsApi = createApi({
  reducerPath: 'yahooFinanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptoNewsList: builder.query({
      query: (region) => createRequest(region),
    }),
  }),
});

export const { useGetCryptoNewsListQuery } = cryptoNewsApi;







// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const cryptoNewsHeaders = {
//   'x-bingapis-sdk': 'true',
//   'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
//   'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
// };

// const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// export const cryptoNewsApi = createApi({
//   reducerPath: 'cryptoNewsApi',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
//   endpoints: (builder) => ({
//     getCryptoNews: builder.query({
//       query: () => createRequest()
//       // search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}
//       ,
//     }),
//   }),
// });

// export const { useGetCryptoNewsQuery } = cryptoNewsApi;
