import {Role} from "boot/role";

const admin_pages = [
  {
    name: "AdminIndex",
    path: "",
    component: () => import("pages/admin/AdminIndex.vue"),
    meta: {authorize: [Role.Admin]}
  },
  {
    name: "AdminClassRoomList",
    path: "classrooms",
    component: () => import("pages/admin/ClassRoomList.vue"),
    meta: {authorize: [Role.Admin]}
  },
  {
    name: "AdminClassCreate",
    path: "classrooms",
    component: () => import("pages/admin/ClassRoom/CreateClassRoom.vue"),
    meta: {authorize: [Role.Admin]}
  },
  {
    name: "AdminClassDetails",
    path: "classrooms/details/:id",
    component: () => import("pages/admin/ClassRoom/ClassRoomDetails.vue"),
    meta: {authorize: [Role.Admin]}
  },
  {
    name: "UploadSessionVideo",
    path: "classrooms/upload/:id",
    component: () => import("pages/admin/ClassRoom/UploadSessionVideo.vue"),
    meta: {authorize: [Role.Admin]}
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

  {
    name: "AdminAdminsList",
    path: "admins/list",
    component: () => import("pages/admin/AdminsList.vue"),
  },
];
const user_pages = [
  {
    name: "UserIndex",
    path: "/",
    component: () => import("pages/user/UserIndex.vue"),
    meta: {authorize: [Role.User]}
  },
  {
    name: "UserActiveClasses",
    path: "classes",
    component: () => import("pages/user/ActiveClasses.vue"),
    meta: {authorize: [Role.User]}
  },
  {
    name: "UserClassView",
    path: "classes/:id",
    component: () => import("pages/user/ClassView.vue"),
  },
  {
    name: "WatchVideo",
    path: "video/:id",
    component: () => import("pages/user/WatchVideo.vue"),
  },
  {
    name: "UserProfile",
    path: "profile",
    component: () => import("pages/user/ProfileMenu.vue"),
    meta: {authorize: [Role.User]}
  },
  {
    name: "UserProfileEdit",
    path: "profile/edit",
    component: () => import("pages/common/EditProfile.vue"),
    meta: {authorize: [Role.User]}
  },
  {
    name: "UserChangePassword",
    path: "profile/change-password",
    component: () => import("pages/common/ChangePassword.vue"),
    meta: {authorize: [Role.User]}
  },
  {
    name: "ContactUs",
    path: "contact-us",
    component: () => import("pages/user/ContactUs.vue"),
    meta: {authorize: [Role.User]}
  },
]

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [

      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
      {path: "about", component: () => import("pages/AboutPage.vue")},

    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: admin_pages,
  },
  {
    path: "/user",
    component: () => import("layouts/UserLayout.vue"),
    children: user_pages,
  },

  {
    path: "/accessdenied",
    name: 'AccessDenied',
    component: () => import("pages/AccessDenied.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
