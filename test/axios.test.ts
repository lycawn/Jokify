import { describe, it, expect, vi } from "vitest";

import * as axiosModule from "../composables/utils/axios";

vi.mock("#imports", () => ({
  useRuntimeConfig: () => ({
    AXIOS: "https://official-joke-api.appspot.com",
  }),
}));

describe("Custom $axios instance", () => {
  it("should use correct baseURL from runtimeConfig", () => {
    const { $axios } = axiosModule;
    expect($axios.defaults.baseURL).toBe(
      "https://official-joke-api.appspot.com"
    );
  });

  it("should have request and response interceptors", () => {
    const { $axios } = axiosModule;

    expect(typeof $axios.interceptors.request.handlers[0].fulfilled).toBe(
      "function"
    );
    expect(typeof $axios.interceptors.response.handlers[0].fulfilled).toBe(
      "function"
    );
  });
});
