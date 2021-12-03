export const getNextRefId = (currentId) => {
  const sections = currentId.split('-');
  const next = Number(sections[1]) + 1;
  return `${sections[0]}-00${next}`;
};
