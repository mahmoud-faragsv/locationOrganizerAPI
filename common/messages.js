const CONSTANTS = {
  MSG: {
    UNIT_TYPE: JSON.stringify({
      Eng: ' "unitType" incorrect  or not exist in data base ',
      Arab: ' اسم  الوحدة  المدخل غير صحيح او غير مسجل فى قاعدة البيانات '
    }),
    UNIT_TYPE_DB: JSON.stringify({
      Eng: `unit type not exist, please check and try again`,
      Arab: 'نوع الوحدة غير مسجل, من فضلك تاكد من البيانات وجرب مره اخرى'
    }),
    NO_ROOT_ID_EXIST: JSON.stringify({
      Eng: `No root unit exist`,
      Arab: 'لا يوجد وحدة اساسية '
    }),
    UNIT_PARENT_CODE: JSON.stringify({
      Eng: ` Incorrect unitParentCode or it not exist`,
      Arab: 'الكود الخاص بالوحدة الاعلى غير صحيح او غير مسجل '
    }),
    ADD_SUCCESS_NEW_RECORD: JSON.stringify({
      Eng: 'New record add successfully',
      Arab: 'تم اضافة وحدة جديدة بنجاح'
    }),
    ADD_SUCCESS_NEW_LEVELS: JSON.stringify({
      Eng: 'levels created successfully',
      Arab: 'تم انشاء المستويات بنجاح'
    }),
    SUCCESS: JSON.stringify({
      Eng: 'success operation',
      Arab: 'عملية ناجحة'
    }),
    INTERNAL_SERVER_ERR: JSON.stringify({
      Eng: 'Internal Server Error ',
      Arab: 'حدث خطاء فى السيرفر'
    }),
    ERROR: JSON.stringify({
      Eng: 'Error ',
      Arab: ' خطاء '
    }),
    FAIL: JSON.stringify({
      Eng: 'Fail ',
      Arab: 'فشل'
    }),
    DUPLICATE_UNIT_CODE: JSON.stringify({
      Eng: 'Unit code must be unique ',
      Arab: 'الكود لايمكن ان يتكرر'
    })
  }
};

export default CONSTANTS;
