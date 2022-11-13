const formatYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  return `${year}-${month}-${day}`;
};

export default formatYYMMDD;
