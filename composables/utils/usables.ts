export const truncText = (id: string) => {
  return id?.length > 10 ? id.slice(0, 20) + "..." : id;
};

const $mobile = () => {
  if (screen.width < 780) {
    return true;
  } else {
    return false;
  }
};

export { $mobile };
