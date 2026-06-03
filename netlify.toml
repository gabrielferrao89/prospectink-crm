exports.handler = async function(event) {
  var SCRIPT = 'https://script.google.com/macros/s/AKfycbwWPiy97_579ecssAmznzk8RkL3SwhEd04NbySLA_W7CHf-mSE4-Y4xlwDEUKGo73FL/exec';
  var params = new URLSearchParams(event.queryStringParameters || {}).toString();
  var url = SCRIPT + (params ? '?' + params : '');

  try {
    var response = await fetch(url, { redirect: 'follow' });
    var text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
