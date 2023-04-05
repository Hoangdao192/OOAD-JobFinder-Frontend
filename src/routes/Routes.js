<<<<<<< HEAD
import { Home } from "../pages/Home";
=======
import { CandidateHome } from "../pages/candidates/CandidateHome";
import BlankLayout from "../components/layouts/blankLayout/BlankLayout";
>>>>>>> origin/fe-dung
import SignIn from "../pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import VerifyEmail from "pages/auth/VerifyEmail";
import CompanyDetail from "pages/auth/detail/CompanyDetail";
import CandidateDetail from "pages/auth/detail/CandidateDetail";
import HomeCompany from "pages/company/HomeCompany";
import Requirement from "pages/company/Requirement";
import Posts from "pages/company/Posts";
import BlankLayout from "components/layouts/BlankLayout";
import PostDetail from "pages/company/PostDetail";
import CandidatesPerPost from "pages/company/CandidatesPerPost";
import AdminLayout from "components/layouts/AdminLayout/AdminLayout";
import Overview from "pages/admin/Overview/Overview";
import UserManager from "pages/admin/UserManager/UserManager";
import Signout from "pages/Logout";
import NotFound from "pages/NotFound/NotFound";
import CandidateHome from "pages/candidates/CandidateHome";

const privateRoutes = [
  //  Example: {path: '/manager/home', layout: ManagerLayout , component: ManagerHome, authorization : ['Admin']}
  //  Explain:
  //  path: path from root
  //  layout: layout for this page (BlankLayout as default)
  //  component: component will be display
  //  authorization: array of roles can access this page

  { path: "admin", component: Overview, layout: AdminLayout, authorization : ['Admin'] },
  { path: "admin/user", component: UserManager, layout: AdminLayout, authorization : ['Admin']}
];
const publicRoutes = [
  //  Example: {path: '/login', component: Login}
  {path: "/not_found", component: NotFound, layout: BlankLayout},
  { path: "/", component: Home, layout: BlankLayout },
  // { path: "/", component: Home, layout: BlankLayout },
  { path: "/", component: CandidateHome, layout: BlankLayout},
  { path: "/auth/signin", component: SignIn, layout: BlankLayout },
  { path: "/auth/signup", component: SignUp, layout: BlankLayout },
  { path: "/auth/signout", component: Signout, layout: BlankLayout},
  { path: "/auth/verifyemail", component: VerifyEmail, layout: BlankLayout },
  {
    path: "/auth/detail/company",
    component: CompanyDetail,
    layout: BlankLayout,
  },
  {
    path: "/auth/detail/candidate",
    component: CandidateDetail,
    layout: BlankLayout,
  },
  { path: "/company", component: HomeCompany, layout: BlankLayout },

  { path: "/company/requirement", component: Requirement, layout: BlankLayout },
  {
    path: "/company/posts",
    component: Posts,
    layout: BlankLayout,
  },
  { path: "company/post/:id", component: PostDetail, layout: BlankLayout },
  {
    path: "company/post/candidates",
    component: CandidatesPerPost,
    layout: BlankLayout,
  }
];

export { publicRoutes, privateRoutes };
