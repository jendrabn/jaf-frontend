export const paths = {
  landing: {
    root: () => `/`,
  },

  flashSale: {
    root: () => `/flash-sale`,
  },

  products: {
    root: () => `/products`,
    detail: (slug: string) => `/products/${slug}`,
  },

  blog: {
    root: () => `/blog`,
    detail: (slug: string) => `/blog/${slug}`,
  },

  contact: {
    root: () => `/contact`,
  },

  about: {
    root: () => `/about`,
  },

  faq: {
    root: () => `/faqs`,
  },

  help: {
    root: () => `/help`,
  },

  cart: {
    root: () => `/cart`,
  },

  checkout: {
    root: () => `/checkout`,
  },

  account: {
    profile: () => `/account/profile`,
    orders: {
      root: () => `/account/orders`,
      detail: (id: string | number) => `/account/orders/${id}`,
    },
    wishlist: () => `/account/wishlist`,
    changePassword: () => `/account/change-password`,
    notifications: () => `/account/notifications`,
  },

  auth: {
    login: {
      root: () => `/auth/login`,
      getHref: (redirectTo?: string) =>
        redirectTo
          ? `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`
          : `/auth/login`,
    },
    verifyLogin: () => `/auth/verify-login`,
    register: () => `/auth/register`,
    resetPassword: () => `/auth/reset-password`,
    forgotPassword: () => `/auth/forgot-password`,
  },

  notFound: {
    root: () => `*`,
  },
};
