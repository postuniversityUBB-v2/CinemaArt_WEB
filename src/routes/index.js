import Index from '../pages/Home/Index';
import Logout from "../pages/Logout/Logout";
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import About from "../pages/About/About";
import ListProjects from '../pages/Project/ListProjects';
import CreateProject from '../pages/Project/CreateProject';
import EditProject from '../pages/Project/EditProject';
// import ListTasks from '../pages/Task/ListTasks';
// import CreateTask from '../pages/Task/CreateTask';
// import EditTask from '../pages/Task/EditTask';
import ListUsers from '../pages/User/ListUsers';

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
    exactRoutes("/project/list", ListProjects),
    exactRoutes("/project/create", CreateProject),
    exactRoutes("/project/edit", EditProject),
    // exactRoutes("/task/list", ListTasks),
    // exactRoutes("/task/create", CreateTask),
    // exactRoutes("/task/edit",EditTask),
    exactRoutes("/user/list", ListUsers),
];

const redirects = [
    redirect("/", "/home/index"),
];

export { baseRoutes, redirects };
