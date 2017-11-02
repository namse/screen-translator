const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = 'AIzaSyDhktmlLOBiD0l6I_F2sIkROE9AGsq1xg0';
const body = {
  requests: [{
    image: {
      content: fs.readFileSync('./1.png', 'base64'),
    },
    features: [{
      type: 'TEXT_DETECTION'
    }],
  }]
};
console.log(body);
fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
  method: 'POST',
  body: JSON.stringify(body),
})
  .then(res => res.json())
  .then((result) => {
    fs.writeFileSync('./result.json', JSON.stringify(result));
  })
  .catch(err => console.log(err));
