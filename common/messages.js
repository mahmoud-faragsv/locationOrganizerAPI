/**
 ** this module holds all the messages which may returned to the client in
 ** all the desired languages [Arabic, English,....]
 */
const CONSTANTS = {
  MSG: {
    UNIT_TYPE: {
      Eng: ' "unitType" incorrect  or not exist in data base ',
      Arab: ' اسم  الوحدة  المدخل غير صحيح او غير مسجل فى قاعدة البيانات '
    },
    UNIT_TYPE_DB: {
      Eng: `unit type not exist, please check and try again`,
      Arab: 'نوع الوحدة غير مسجل, من فضلك تاكد من البيانات وجرب مره اخرى'
    },
    NO_ROOT_ID_EXIST: {
      Eng: `No root unit exist`,
      Arab: 'لا يوجد وحدة اساسية '
    },
    UNIT_PARENT_CODE: {
      Eng: ` Incorrect unitParentCode or it not exist`,
      Arab: 'الكود الخاص بالوحدة الاعلى غير صحيح او غير مسجل '
    },
    ADD_SUCCESS_NEW_RECORD: {
      Eng: 'New record add successfully',
      Arab: 'تم اضافة وحدة جديدة بنجاح'
    },
    ADD_SUCCESS_NEW_LEVELS: {
      Eng: 'levels created successfully',
      Arab: 'تم انشاء المستويات بنجاح'
    },
    SUCCESS: {
      Eng: 'success operation',
      Arab: 'عملية ناجحة'
    },
    INTERNAL_SERVER_ERR: {
      Eng: 'Internal Server Error ',
      Arab: 'حدث خطاء فى السيرفر'
    },
    ERROR: {
      Eng: 'Error ',
      Arab: ' خطاء '
    },
    FAIL: {
      Eng: 'Fail ',
      Arab: 'فشل'
    },
    DUPLICATE_UNIT_CODE: {
      Eng: 'Unit code must be unique ',
      Arab: 'الكود لايمكن ان يتكرر'
    },
    NON_EXIST_LANGUAGE: {
      Eng: 'The langauge which you selected not exist in the DB',
      Arab: 'اللغة المدخلة ليست موجودة فى قاعدة البيانات'
    },
    UPLOAD_MAP: {
      Eng: 'you can only upload image type files',
      Arab: 'مسموح فقط برفع خرائط كصورة '
    },
    NO_MAP_UPLOADED: {
      Eng: 'You have to provide a map first',
      Arab: 'لابد من رفع الخريطة اولا'
    },
    MAP_RESIZING: {
      Eng: 'There is an error related to image resizing',
      Arab: 'يوجد خطاء متعلق بمعالجة الخريطة '
    },
    SUCCESS_IMAGE_UPLOADING: {
      Eng: 'Image uploaded successfully',
      Arab: 'تم رفع الخريطة بنجاح'
    },
    UPDATE_LEVEL_SUCCESS: {
      Eng: 'Level has been updated successfully',
      Arab: 'تم تغيير بيانات المستوى بنجاح'
    },
    GET_ALL_LEVELS_SUCCESS: {
      Eng: 'All levels and their number of records has been returned successfully',
      Arab: 'تم العثور علي جميع المستويات و عدد محتويات كل مستوى'
    },
    GET_ALL_RECORDS_SUCCESS: {
      Eng: 'All records has been returned successfully',
      Arab: 'تم العثور علي جميع الاغراض'
    },
    GET_RECORD_SUCCESS: {
      Eng: 'Record has been returned successfully',
      Arab: 'تم العثور على الغرض بنجاح'
    },
    DOES_NOT_EXIST: {
      Eng: 'What you are looking for does not exist',
      Arab: 'لم يتم العثور علي ما تبحث عليه'
    },
    RECORD_UPDATE_SUCCESS: {
      Eng: 'Record has been updated successfully',
      Arab: 'تم تغيير بيانات الغرض بنجاح'
    }
  }
};

export default CONSTANTS;
