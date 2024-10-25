const fs = require("fs");

function findConstant(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const n = data.keys.n;
    const k = data.keys.k;
    const points = [];
    for (let i = 1; i <= n; i++) {
      if (data[i]) {
        const x = i;
        const base = parseInt(data[i].base);
        const y = parseInt(data[i].value, base);
        points.push([x, y]);
      }
    }

    let constantTerm = 0;
    const selectedPoints = points.slice(0, k);

    for (let i = 0; i < k; i++) {
      let [xi, yi] = selectedPoints[i];
      let li = 1;

      for (let j = 0; j < k; j++) {
        if (i !== j) {
          let [xj] = selectedPoints[j];
          li *= -xj / (xi - xj);
        }
      }
      constantTerm += yi * li;
    }

    console.log("Constant term (c):", constantTerm);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

findConstant("testcase1.json");
findConstant("testcase2.json");
