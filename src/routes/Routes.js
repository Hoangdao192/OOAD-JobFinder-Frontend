import { Home } from "../pages/Home";
import BlankLayout from "../components/layouts/blankLayout/BlankLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import VerifyEmail from "pages/auth/VerifyEmail";
import CompanyDetail from "pages/auth/detail/CompanyDetail";

const privateRoutes = [
  //  Example: {path: '/manager/home', layout: ManagerLayout , component: ManagerHome, authorization : ['Admin']}
  //  Explain:
  //  path: path from root
  //  layout: layout for this page (BlankLayout as default)
  //  component: component will be display
  //  authorization: array of roles can access this page
];
const publicRoutes = [
  //  Example: {path: '/login', component: Login}
  // { path: "/", component: Home, layout: BlankLayout },
  { path: "/", component: Home},
  { path: "/auth/signin", component: SignIn, layout: BlankLayout },
  { path: "/auth/signup", component: SignUp, layout: BlankLayout },
  { path: "/auth/verifyemail", component: VerifyEmail, layout: BlankLayout },
  {
    path: "/auth/detail/company",
    component: CompanyDetail,
    layout: BlankLayout,
  },
];

export { publicRoutes, privateRoutes };
