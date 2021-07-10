/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
import NoteAdd from "@material-ui/icons/NoteAdd";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// core components/views for Admin layout

import DashboardPage from "../views/Dashboard/Dashboard.js";

import SubmissionPage from "../views/Submission/index.js";
import Form from '../views/Form/index'
import myForms from '../views/MyForms/index'


const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  {
    path: "/myform",
    name: "My Forms",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AssignmentIndIcon ,
    component: myForms,
    layout: "/admin"
  },
  {
    path: "/createform",
    name: "Create Form",
    icon: NoteAdd ,
    component: Form,
    layout: "/admin"
  },
 

  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  {
    path: "/submissions",
    name: "Submissions Data",
    rtlName: "إخطارات",
    icon: Notifications,
    component: SubmissionPage,
    layout: "/admin"
  },



];

export default dashboardRoutes;
