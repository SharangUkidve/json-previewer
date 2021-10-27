export const fileDownload = (text: string, filename: string) => {
  const data = new Blob([text], { type: "text/plain" });
  const url = window.URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1000 * 2 * 60);
};