
function getHeightOfBoundingBox(boundingBox) {
  const {
    vertices,
  } = boundingBox;
  const { minX, minY, maxX, maxY } = vertices.reduce(({ minX, minY, maxX, maxY }, vertex) => ({
    minX: (!minX || minX > vertex.x) ? vertex.x : minX,
    minY: (!minY || minY > vertex.y) ? vertex.y : minY,
    maxX: (!maxX || maxX < vertex.x) ? vertex.x : maxX,
    maxY: (!maxY || maxY < vertex.y) ? vertex.y : maxY,
  }), {});
  const height = maxY - minY;
  return height;
}

function getTextHeight(text, fontSize, ctx) {
  const MAX_WIDTH = fontSize * 3;
  const MAX_HEIGHT = fontSize * 2;

  ctx.fillStyle='#000000';
  ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle='#FFFFFF';
  ctx.fillText(text, 0, MAX_HEIGHT / 2);

  const imageData = ctx.getImageData(0, 0, MAX_WIDTH, MAX_HEIGHT).data;

  let boundingTop;
  let boundingBottom;

  for (let y = 0; y < MAX_HEIGHT; y += 1) {
    for (let x = 0; x < MAX_WIDTH; x += 1) {
      const index = (y * MAX_WIDTH + x) * 4;
      const pixelisPainted = (imageData[index] !== 0
        || imageData[index + 1] !== 0
        || imageData[index + 2] !== 0);
      if (pixelisPainted) {
        // console.log(imageData[index], imageData[index + 1], imageData[index + 2], y);
        if (!boundingTop) {
          boundingBottom = boundingTop = y;
          break;
        } else {
          boundingBottom = y;
        }
      }
    }
  }

  return boundingBottom - boundingTop;
}

function getFontSizeOfSymbol(symbol, ctx) {
  const {
    text,
    boundingBox,
  } = symbol;

  const textHeight = getHeightOfBoundingBox(boundingBox);

  let minFontSize = textHeight;
  let maxFontSize = textHeight * 4;

  while (true) {
    if (minFontSize === maxFontSize) {
      return minFontSize;
    }
    const midFontSize = Math.floor((minFontSize + maxFontSize) / 2);
    const calculatedTextHeight = getTextHeight(text, midFontSize, ctx);

    if (calculatedTextHeight === textHeight) {
      return midFontSize;
    } else if (calculatedTextHeight > textHeight) {
      maxFontSize = midFontSize - 1;
    } else {
      minFontSize = midFontSize + 1;
    }
  }
}

function getFontSize(paragraph) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let count = 0;
  let sum = 0;
  paragraph.words.forEach(word =>
    word.symbols.forEach(symbol => {
      if (!symbol.text.match(/[a-z]/i)) {
        return;
      }
      const fontSize = getFontSizeOfSymbol(symbol, ctx);
      sum += fontSize;
      count += 1;
    }));
  const averageFontSize = sum / count;
  return averageFontSize;
}
