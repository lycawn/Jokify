export const truncText = (id: string) => {
  return id?.length > 10 ? id.slice(0, 20) + "..." : id;
};
