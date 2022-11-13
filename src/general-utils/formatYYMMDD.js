const formatYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  return `${year}-${month}-${day}`;
};

export default formatYYMMDD;
