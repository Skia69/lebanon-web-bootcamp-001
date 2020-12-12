//Input
matrix = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
];

//Output
output = [
  [1, 9, 2, 1],
  [2, 3, 9, 2],
  [3, 9, 4, 9],
  [9, 9, 3, 1],
];

//Check whether the current index is out of the matrix bound
const isOutOfBounds = (grid, i, j) => {
  return i < 0 || i >= grid.length || j < 0 || j >= grid.length;
};

const solve = (grid) => {
  //Construct a new matrix based on the original matrix's size and fill it with zeros
  let ans = new Array(grid.length).fill([]);
  ans = ans.map(() => new Array(grid.length).fill(0));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      //Start a counter so that we calculate the number of neighbors that are equal to 1
      let neighborsCount = 0;
      //Grab all the possible surrounding neighbors' coordinates and store em into an array
      //grid[i][j]
      const points = [
        [i, j + 1],
        [i, j - 1],
        [i + 1, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i - 1, j],
        [i - 1, j + 1],
        [i - 1, j - 1],
      ];
      //Loop through the coordinates array that we previously defined
      //So that we can check which has value that's equal to 1
      for (point of points) {
        //Give the i and j meaningful names
        //This is known as Array destructuring where we can rename the entries
        const [x, y] = point;
        //Filter the points array by making use of the isOutOfBounds helper function
        //So that only those coordinates that are within the matrix bounds are to be calculated
        //Since we don't always have a total of 8 neighbors (Corners will have a total of 3)
        if (!isOutOfBounds(grid, x, y) && grid[x][y] === 1) {
          neighborsCount++;
          ans[x][y] = 9;
        }
      }
      //Replace the current loop iteration with neighborsCount
      ans[i][j] = neighborsCount;
    }
  }
  return ans;
};

solve(matrix);
