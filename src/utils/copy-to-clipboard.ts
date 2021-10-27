export const copyToClipboard = (text: string) => {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve(true);
        })
        .catch((e) => reject(e));
    } else {
      const fallbackSuccess = fallbackCopyTextToClipboard(text);
      fallbackSuccess ? resolve(true) : reject(fallbackSuccess);
    }
  });
};

const fallbackCopyTextToClipboard = (text: string) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    return document.execCommand("copy");
  } catch (err) {
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
};
