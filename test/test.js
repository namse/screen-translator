window.onload = () => {
  const c = document.getElementById('canvas');
  const ctx = c.getContext('2d');
  const img = document.getElementById('original');
  console.log(img);
  ctx.drawImage(img, 0, 0);
  img.remove();

  // result.js 안에 들어있는 정보로 이미지 위에 올려주기만 하면 됨. ㅅㄱ여
  const text = document.getElementById('text');
  const {
    textAnnotations, // word 단위
    fullTextAnnotation, // paragraph 단위
  } = result.responses[0];

  text.innerHTML = JSON.stringify(fullTextAnnotation, null, 2);
  console.log(fullTextAnnotation);

  drawFullTextAnnotation(fullTextAnnotation, ctx);

  const texts = extractText(fullTextAnnotation);

  // translate(texts[3])
  // .then(translatedText => console.log(translatedText));
};

function extractText(fullTextAnnotation) {
  // pages => blocks => paragraphs => words => symbols => text
  // block 단위로 끊기
  const { pages } = fullTextAnnotation;
  const texts = [];
  pages.forEach(page =>
    page.blocks.forEach(block =>
      block.paragraphs.forEach((paragraph) => {
        let text = '';
        paragraph.words.forEach((word) => {
          word.symbols.forEach(symbol =>
            text += symbol.text)
          text += ' ';
        });
        console.log(text);
        texts.push(text);
      })));
  return texts;
}

function drawFullTextAnnotation(fullTextAnnotation, ctx) {
  const { pages } = fullTextAnnotation;
  pages.forEach(page =>
    page.blocks.forEach(block => drawPoly(block.boundingBox.vertices, ctx)));
}

function drawPoly(vertices, ctx) {
  ctx.strokeStyle = '#FF0000';
  ctx.beginPath();
  let firstVertex;
  vertices.forEach((vertex, index) => {
    if (index === 0) {
      firstVertex = vertex;
      ctx.moveTo(vertex.x, vertex.y);
    } else {
      ctx.lineTo(vertex.x, vertex.y);
    }
  });
  ctx.lineTo(firstVertex.x, firstVertex.y);
  ctx.stroke();
}

function drawTextAnnotation(textAnnotations, ctx) {
  textAnnotations.map(textAnnotation => textAnnotation.boundingPoly.vertices)
  .forEach(vertiecs => drawPoly(vertiecs, ctx));
}
