const https = require('https');

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwWPiy97_579ecssAmznzk8RkL3SwhEd04NbySLA_W7CHf-mSE4-Y4xlwDEUKGo73FL/exec';

exports.handler = async function(event) {
  const params = new URLSearchParams(event.queryStringParameters).toString();
  const url = APPS_SCRIPT_URL + '?' + params;

  try {
    const data = await new Promise((resolve, reject) => {
      let result = '';
      const makeRequest = (requestUrl) => {
        https.get(requestUrl, (res) => {
          if (res.statusCode === 302 || res.statusCode === 301) {
            makeRequest(res.headers.location);
            return;
          }
          res.on('data', chunk => result += chunk);
          res.on('end', () => resolve(result));
          res.on('error', reject);
        }).on('error', reject);
      };
      makeRequest(url);
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
