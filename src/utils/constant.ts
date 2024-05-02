export function getDate(data: number): string {
  const newDate = new Date(data * 1000);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const date = newDate.getDate().toString().padStart(2, "0");
  const hours = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");
  return `${date}.${month}.${year} ${hours}:${minutes}`;
}

export const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(txt.value, "text/html");

  return doc.body.textContent || "";
};
