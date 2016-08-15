let HttpRequest = (method, url) => {
  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest();

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

module.exports = HttpRequest;
