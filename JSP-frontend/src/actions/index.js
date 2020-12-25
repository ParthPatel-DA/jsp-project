export * from "./auth/auth";
export * from "./user/user";
export * from "./task/task";

export const resetApp = (payload) => ({
  type: "RESET_APP",
  payload,
});
