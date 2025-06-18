import { SocketProvider } from '@/socket';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const isAuthenticated = JSON.parse(localStorage.getItem("admin-status"))

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <SocketProvider>
            <Outlet />
        </SocketProvider>
    )
};

export default ProtectedRoute;
