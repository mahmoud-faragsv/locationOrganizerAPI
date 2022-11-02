//  Unit route Handlers
//? http://localhost:3000/api/v1/Unit POST
export const createUnit = (req, res) => {
  res.send('create new Unit');
};

//? http://localhost:3000/api/v1/unit/:id GET
export const getUnit = (req, res) => {
  res.send('getUnit');
};

//? http://localhost:3000/api/v1/Unit GET
export const getAllUnits = (req, res) => {
  res.send('getAllUnits');
};

//? http://localhost:3000/api/v1/unit/:id PATCH
export const updateUnit = (req, res) => {
  res.send('updateUnit Unit');
};
