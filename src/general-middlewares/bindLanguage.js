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
const bindLangInReq = catchAsyncErr(async (req, res, next) => {
  const { lang } = req.body;
  const { lang: lngtype } = req.query;
  const langType = lang || lngtype || 'Eng'; // Eng is the default lang if not provided
  await getLanguage(langType, req, next);
});

export default bindLangInReq;
