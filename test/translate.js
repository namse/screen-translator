function translate(text) {
  const body = {
    q: text,
    target: 'ko',
  };
  return fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDhktmlLOBiD0l6I_F2sIkROE9AGsq1xg0', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(json => json.data.translations[0].translatedText);
}
