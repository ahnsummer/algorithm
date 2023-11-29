const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const testCases = [];
let numOfCabbage;
for (let i = 1; i < input.length; i = i + numOfCabbage + 1) {
  const [m, n, _numOfCabbage] = input[i].split(" ").map(num => + num);
  numOfCabbage = _numOfCabbage;

  const testCase = new Array(n).fill(0).map(_ => new Array(m).fill(0));

  for(let j = 0; j < numOfCabbage; j++) {
    const [x, y] = input[i + 1 + j].split(" ").map(num => +num);
    testCase[y][x] = 1;
  }

  testCases.push(testCase);
}

/**
 * 인접한 1을 찾아서 싹~다 0으로 바꿔줌 (본인 포함)
 * 
 * 그럴려면
 * 위쪽, 왼쪽, 아래쪽, 오른쪽 사방으로 검사를 연쇄적으로 하면 됨
 */
const dfs = (x, y, cabbages) => {
  // 0. 만약에 cell이 0이거나, 없는 셀이면 dfs 할 필요 없음
  if(
    x < 0 || 
    y < 0 || 
    x >= cabbages[0].length || 
    y >= cabbages.length || 
    cabbages[y][x] === 0
  ) {
    return;
  }

  // 1. 현재 cell을 0으로 초기화
  cabbages[y][x] = 0;

  // 2. 사방으로 dfs를 실행
  dfs(x, y - 1, cabbages);
  dfs(x - 1, y, cabbages);
  dfs(x, y + 1, cabbages);
  dfs(x + 1, y, cabbages);
}

const solution = (cabbages) => {
  let earthWormCount = 0;

  for(let i = 0; i < cabbages.length; i++) {
    for(let j = 0; j < cabbages[i].length; j++) {
      const cell = cabbages[i][j];
      if(cell === 1) {
        earthWormCount++;
      }

      dfs(j, i, cabbages);
    }
  }

  return earthWormCount;
}

testCases.forEach(testCase => console.log(solution(testCase)));
