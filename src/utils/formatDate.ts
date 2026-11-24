export const formatTaskDate = (dateString: string) => {
  return new Date(dateString)
    .toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    })
    .replace(' г.', ''); // Вернет аккуратное: "23 нояб. 2026"
};
