import { getLangType } from '../../common/shared.services.js';
import { catchAsyncErr } from '../general-utils/index.js';

async function getLanguage(lang, req, next) {
  const resLang = await getLangType(lang.trim());

  const { ID: langTypeID } = resLang[0][0];
  req.langTypeID = langTypeID;
  next();
}
const getLanguageID = catchAsyncErr(async (req, res, next) => {
  const { lang } = req.body;
  if (lang) await getLanguage(lang, req, next);
  else await getLanguage('Eng', req, next);
});

export default getLanguageID;
