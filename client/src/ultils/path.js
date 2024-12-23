const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS__CATEGORY: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQ: "faqs",
  DETAIL_PRODUCT_CATEGORY_PID_TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_CART: "detail-cart",
  CHECKOUT: "checkout",
  PRODUCTS: "products",

  // Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_PRODUCTS: "manage-products",
  CREATE_PRODUCTS: "create-products",
  MANAGE_USER: "manage-user",
  MANAGE_ORDER: "manage-order",
  MANAGE_CATEGORIES: "manage-categories",
  MANAGE_BLOGS: "manage-blogs",

  // Member
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  WISHLIST: "wishlist",
  BUY_HISTORY: "buy-history",
};
export default path;
