import { catchAsyncErr } from '../general-utils/index.js';
import { getLangType } from '../shared/shared.services.js';

const getLanguageID = catchAsyncErr(async (req, res, next) => {
  const { lang } = req.body;
  if (lang) {
    const resLang = await getLangType(lang);
    const { ID: langTypeID } = resLang[0][0];
    req.langTypeID = langTypeID;
    next();
  } else {
    const resLang = await getLangType('Eng'); // English returned by default
    const { ID: langTypeID } = resLang[0][0];
    req.langTypeID = langTypeID;
    next();
  }
});

export default getLanguageID;
