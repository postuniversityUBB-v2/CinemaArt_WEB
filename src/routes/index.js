import Index from '../pages/Home/Index';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import About from "../pages/About/About";

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
    exactRoutes("/login", Login),
    exactRoutes("/register", Register),
    exactRoutes("/terms", Terms),
    exactRoutes("/privacy", Privacy),
    exactRoutes("/forgot-password", ForgotPassword),
    exactRoutes("/about", About),
];

const redirects = [
    redirect("/", "/home/index"),
];

export { baseRoutes, redirects };
