import { getLangType } from '../../common/shared.services.js';
import BadRequestErr from '../errors/badRequest.error.js';
import { catchAsyncErr } from '../general-utils/index.js';
import CONSTANTS from '../../common/messages.js';

async function getLanguage(lang, req, next) {
  const resLang = await getLangType(lang.trim());

  if (resLang[0].length === 0) {
    return next(
      new BadRequestErr(
        CONSTANTS.MSG.NON_EXIST_LANGUAGE.Eng, // respond in english if cst not provide us a correct language
        CONSTANTS.MSG.FAIL.Eng
      )
    );
  }

  const { ID: langTypeID } = resLang[0][0];

  req.langTypeID = langTypeID;
  req.langType = lang.trim();

  next();
}
/**
 * @function a middleware  func  responsible for detecting the request language type from
 *  the beginning of the request life cycle.
 * it inject 2 properties into the request object
 * 1) req.langTypeID: number --> the detected language ID in the DB
 * 2) req.langType: string --> just a short_label for the provided language, ex:'Eng' , 'Arab
 */
const bindInReq = catchAsyncErr(async (req, res, next) => {
  const { lang } = req.body;
  const { lang: lngtype } = req.query;

  const langType = lang || lngtype || 'Eng'; // Eng is the default lang if not provided

  await getLanguage(langType, req, next);
});

export default bindInReq;
