export const getSession = () => {
  const nameOfCookie = 'jwt=';
  const cookieData = document.cookie;
  let start = cookieData.indexOf(nameOfCookie);
  if (start !== -1) {
    start += nameOfCookie.length;
    let end = cookieData.indexOf(';', start);
    if (end === -1) end = cookieData.length;
    return 'Bearer ' + cookieData.substring(start, end);
  }
  return '';
};

export const deleteSession = () => {
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
