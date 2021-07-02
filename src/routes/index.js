import Index from '../pages/Home/Index';
import Logout from "../pages/Logout/Logout";
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import About from "../pages/About/About";
import Contact from '../pages/Contact/Contact';
import ListMovies from '../pages/Movie/ListMovies';
import CreateProject from '../pages/Movie/CreateProject';
import EditProject from '../pages/Movie/EditProject';
import ListTasks from '../pages/Task/ListTasks';
import CreateTask from '../pages/Task/CreateTask';
import EditTask from '../pages/Task/EditTask';
import ListUsers from '../pages/User/ListUsers';
import Charts from '../pages/Statistics/Charts';

const exactRoutes = (path, component) => ({
    path,
    component,
    exact: true,
});

const redirect = (from, to) => ({
    from,
    to,
    exact: true,
});

const baseRoutes = [
    exactRoutes("/home/index", Index),
    exactRoutes("/logout", Logout),
    exactRoutes("/login", Login),
    exactRoutes("/register", Register),
    exactRoutes("/terms", Terms),
    exactRoutes("/privacy", Privacy),
    exactRoutes("/about", About),
    exactRoutes("/contact", Contact),
    exactRoutes("/movie/list", ListMovies),
    exactRoutes("/project/create", CreateProject),
    exactRoutes("/project/edit", EditProject),
    exactRoutes("/task/list", ListTasks),
    exactRoutes("/task/create", CreateTask),
    exactRoutes("/task/edit",EditTask),
    exactRoutes("/user/list", ListUsers),
    exactRoutes("/statistics/chart", Charts),
];

const redirects = [
    redirect("/", "/home/index"),
];

export { baseRoutes, redirects };
