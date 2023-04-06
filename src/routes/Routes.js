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
import EditPost from "pages/company/EditPost";
import CandidatesList from "pages/company/CandidatesList";
import Profile from "pages/company/Profile";
import EditProfile from "pages/company/CompanyEditProfile";
import CandidateInfor from "pages/company/CandidateInfor";
import CandidateProfile from "pages/candidates/Profile";
import CandidateEditProfile from "pages/candidates/CandidateEditProfile";

const privateRoutes = [
  //  Example: {path: '/manager/home', layout: ManagerLayout , component: ManagerHome, authorization : ['Admin']}
  //  Explain:
  //  path: path from root
  //  layout: layout for this page (BlankLayout as default)
  //  component: component will be display
  //  authorization: array of roles can access this page
];
const publicRoutes = [
  {
    path: "admin",
    component: Overview,
    layout: AdminLayout,
    authorization: ["Admin"],
  },
  {
    path: "admin/user",
    component: UserManager,
    layout: AdminLayout,
    authorization: ["Admin"],
  },
  {
    path: "/company",
    component: HomeCompany,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/requirement",
    component: Requirement,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/posts",
    component: Posts,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/post/:id",
    component: PostDetail,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/post/candidates",
    component: CandidatesPerPost,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/post/edit",
    component: EditPost,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/candidates",
    component: CandidatesList,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/profile",
    component: Profile,
    layout: BlankLayout,
    authorization: ["Company"],
  },
  {
    path: "/company/profile/edit",
    component: EditProfile,
    layout: BlankLayout,
    authorization: ["Company"],
  },

  { path: "/not_found", component: NotFound, layout: BlankLayout },
  { path: "/", component: CandidateHome, layout: BlankLayout },
  { path: "/auth/signin", component: SignIn, layout: BlankLayout },
  { path: "/auth/signup", component: SignUp, layout: BlankLayout },
  { path: "/auth/signout", component: Signout, layout: BlankLayout },
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
  {
    path: "/company/candidateinfor",
    component: CandidateInfor,
    layout: BlankLayout,
  },
  {
    path: "/candidate/profile",
    component: CandidateProfile,
    layout: BlankLayout,
  },
  {
    path: "/candidate/profile/edit",
    component: CandidateEditProfile,
    layout: BlankLayout,
    authorization: ["Candidate"],
  },
];

export { publicRoutes, privateRoutes };
