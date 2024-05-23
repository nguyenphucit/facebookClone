export  const convertToFormData = (data,File) => {
    let formData = new FormData();
    const keys = Object.keys(data);
    const filteredObject = keys.reduce((result, key) => {
      if (data[key] !== null && data[key] !== "") {
        result[key] = data[key];
      }
      return result;
    }, {});
    for (const key in filteredObject) {
      if (Object.hasOwnProperty.call(filteredObject, key)) {
        const value = filteredObject[key];
        formData.append(key, value);
      }
    }
    if(File)
    formData.append("file", File);
    return formData;
  };

  export const chosingImage = (e,setImageFile) => {
    const file = e.target.files[0];
    setImageFile(file);
  };