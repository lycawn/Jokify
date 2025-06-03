export const truncText = (id: string) => {
  return id?.length > 10 ? id.slice(0, 20) + "..." : id;
};

const $mobile = () => {
  return screen.width < 780 ? true : false;
};

export { $mobile };
