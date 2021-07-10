import Index from '../pages/Home/Index';
import SignOut from "../pages/SignOut/SignOut";
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import About from "../pages/About/About";
import Contact from '../pages/Contact/Contact';
import ListMovies from '../pages/Movie/ListMovies';
import CreateMovie from '../pages/Movie/CreateMovie';
import EditMovie from '../pages/Movie/EditMovie';
import ListReviews from '../pages/Review/ListReviews';
import CreateReview from '../pages/Review/CreateReview';
import EditReview from '../pages/Review/EditReview';
import UserWatchlist from '../pages/Watchlist/UserWatchlist';

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
    exactRoutes("/signout", SignOut),
    exactRoutes("/signIn", SignIn),
    exactRoutes("/signUp", SignUp),
    exactRoutes("/terms", Terms),
    exactRoutes("/privacy", Privacy),
    exactRoutes("/about", About),
    exactRoutes("/contact", Contact),
    exactRoutes("/movie/list", ListMovies),
    exactRoutes("/movie/create", CreateMovie),
    exactRoutes("/movie/edit", EditMovie),
    exactRoutes("/review/list", ListReviews),
    exactRoutes("/review/create", CreateReview),
    exactRoutes("/review/edit", EditReview),
    exactRoutes("/watchlist/list", UserWatchlist),
];

const redirects = [
    redirect("/", "/home/index"),
];

export { baseRoutes, redirects };
