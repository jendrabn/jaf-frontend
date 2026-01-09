export const paths = {
  auth: {
    login: {
      getHref: (redirectTo?: string) => `/auth/login?redirectTo=${redirectTo}`,
    },
  },
};
