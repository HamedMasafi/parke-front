const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      {
        name: "Login",
        path: "user/login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "AdminClassRoomList",
        path: "classrooms",
        component: () => import("pages/admin/ClassRoomList.vue"),
      },
      {
        name: "AdminClassCreate",
        path: "classrooms",
        component: () => import("pages/admin/ClassRoom/CreateClassRoom.vue"),
      },
      {
        name: "AdminClassEdit",
        path: "classrooms/edit/:id",
        component: () => import("pages/admin/ClassRoom/CreateClassRoom.vue"),
      },
      {
        name: "AdminClassRegisters",
        path: "classrooms/registers/:id",
        component: () => import("pages/admin/ClassRoom/ClassRoomRegisters.vue"),
      },
      {
        name: "AdminUsersList",
        path: "users/list",
        component: () => import("pages/admin/Users/UsersList.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
