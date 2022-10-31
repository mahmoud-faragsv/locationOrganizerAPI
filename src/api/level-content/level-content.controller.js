// import BadRequestErr from '../../errors/badRequest.error.js';

// import NotFoundErr from '../../errors/notFound.error.js';
import catchAsyncErr from '../../utils/catchAyncErr.js';

// http://domain/api/v1/level-content/
export const createLevelContent = catchAsyncErr(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: 'new LevelContent'
  });
});
// http://domain/api/v1/level-content/:id
export const getLevelContent = catchAsyncErr(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'LevelContent get ' });
});
// eslint-disable-next-line no-debugger
// http://domain/api/v1/level-content/
export const getAllLevelContents = catchAsyncErr(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    result: 'result getAllLevelContents',
    data: 'contents'
  });
});

// http://domain/api/v1/level-content/:id
export const updateLevelContent = catchAsyncErr(async (req, res, next) => {
  res
    .status(200)
    .json({ status: 'success', message: 'LevelContent Updated successfully' });
});

// http://domain/api/v1/level-content/:id
export const deleteLevelContent = catchAsyncErr(async (req, res, next) => {
  res
    .status(200)
    .json({ status: 'success', message: 'LevelContent deleted successfully' });
});
