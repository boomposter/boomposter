const routes = {
  home: "/",
  notFound: "/404",
  error: "/error",
  login: "/login",
  register: "/register",
  profile: "/profile",
  // Spaces
  adspaces: "/adspaces", // own? search? public?
  adspace: (id) => `/adspaces/${id}`,
  adspaceCreate: "/adspaces/create",
  adspaceEdit: (id) => `/adspaces/${id}/edit`,
};

export default routes;
