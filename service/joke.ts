const getRandomJokeFn = async () => {
  let baseUrl = `random_joke`;

  return await $axios.get(baseUrl).then((res) => {
    return res.data;
  });
};
const getRandomSingleTypeJokeFn = async (type: string) => {
  let baseUrl = `jokes/${type}/random`;
  return await $axios.get(baseUrl).then((res) => {
    return res.data;
  });
};
const getJokeTypesFn = async () => {
  let baseUrl = `types`;
  return await $axios.get(baseUrl).then((res) => {
    return res.data;
  });
};
const getJokeByIdFn = async (id: string) => {
  let baseUrl = `jokes/${id}`;
  return await $axios.get(baseUrl).then((res) => {
    return res.data;
  });
};
export {
  getRandomJokeFn,
  getRandomSingleTypeJokeFn,
  getJokeTypesFn,
  getJokeByIdFn,
};
