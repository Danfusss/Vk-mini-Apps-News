const baseURL = "https://hacker-news.firebaseio.com/v0/";

export async function getIds() {
  try {
    const res = await fetch(`${baseURL}topstories.json?print=pretty`);
    if (!res.ok) {
      throw new Error("Не удалось получить данные с сервера");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getNews(id: number) {
  try {
    const res = await fetch(`${baseURL}item/${id}.json?print=pretty`);
    if (!res.ok) {
      throw new Error("Не удалось получить данные с сервера");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getComments(id: number) {
  try {
    const res = await fetch(`${baseURL}item/${id}.json?print=pretty`);
    if (!res.ok) {
      throw new Error("Не удалось получить данные с сервера");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
