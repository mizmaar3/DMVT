const HttpRequest = (method, url) => {
  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.onerror = () => {
      reject(xhr);
    };

    xhr.open(method, url);
    xhr.send();
  });
};

export default HttpRequest;
