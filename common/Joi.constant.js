const JoiMessages = {
  'string.empty': JSON.stringify({
    key: `{#key}`,
    Eng: `not allowed to be empty`,
    Arab: `لابد من وجود قيمة`
  }),
  'any.required': JSON.stringify({
    key: `{#key}`,
    Eng: `{#key} is required`,
    Arab: `القيمة مطلوبة {#key}`
  }),
  'string.base': JSON.stringify({
    key: `{#key}`,
    Eng: `must to be a string`,
    Arab: 'لابد ان تكون كلمه نصية '
  }),
  'array.base': JSON.stringify({
    key: `{#key}`,
    Eng: 'it must be array of strings or just null',
    Arab: ' لابد ان تكون مصفوفة نصوص او خالية  '
  }),
  'string.min': JSON.stringify({
    key: `{#key}`,
    Eng: 'it must be 6 elements ',
    Arab: 'يجب أن تكون 6عناصر'
  }),
  'string.pattern.base': JSON.stringify({
    key: `{#key}`,
    Eng: 'color must begin with #',
    Arab: 'اللون لابد ان يبدء بعلامة الشباك'
  })
};
export default JoiMessages;
