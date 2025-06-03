export const truncText = (id: string) => {
  return id?.length > 10 ? id.slice(0, 20) + "..." : id;
};

const $mobile = screen.width < 768 ? true : false;

export { $mobile };
