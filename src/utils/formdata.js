const formData = params => {
  let obj = {};
  if (params.indexOf("&")) {
    params
      .slice(1)
      .split("&")
      .forEach((item, index) => {
        obj[item.split("=")[0]] = item.split("=")[1];
      });
  } else {
    obj[params.slice(1).split("=")[0]] = params.slice(1).split("=")[1];
  }
  return obj;
};

export default formData;
