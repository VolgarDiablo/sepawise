const escapeMarkdown = (text) => {
  if (typeof text !== "string") {
    console.error(
      "Ошибка: в escapeMarkdown передан не строковый аргумент",
      text
    );
    return text; // Возвращаем исходное значение, если это не строка
  }
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
};

export default escapeMarkdown;
