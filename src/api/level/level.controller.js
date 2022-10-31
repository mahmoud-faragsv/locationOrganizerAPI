//  Level route Handlers
//? http://localhost:3000/api/v1/Level POST
export const createLevel = (req, res) => {
  res.send('create new Level');
};

//? http://localhost:3000/api/v1/level/:id GET
export const getLevel = (req, res) => {
  res.send('getLevel');
};

//? http://localhost:3000/api/v1/Level GET
export const getAllLevels = (req, res) => {
  res.send('getAllLevels');
};

//? http://localhost:3000/api/v1/level/:id PATCH
export const updateLevel = (req, res) => {
  res.send('updateLevel Level');
};
