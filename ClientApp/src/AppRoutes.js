import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./components/conx/Login";
import CreateUser from "./components/conx/CreateUser";
import WeatherHistory from "./components/WeatherHistory";
const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/signup',
        element: <CreateUser />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/history',
        element: <WeatherHistory />
    }
];

export default AppRoutes;
