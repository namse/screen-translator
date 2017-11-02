// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Instantiates a client
const translate = Translate();

// The text to translate, e.g. "Hello, world!"
const text = "Fine, I'll say it! We got it, Cayde, Now, how did you -";

// The target language, e.g. "ru"
const target = 'ko';

// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.
translate.translate(text, target)
  .then((results) => {
    let translations = results[0];
    translations = Array.isArray(translations) ? translations : [translations];

    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
