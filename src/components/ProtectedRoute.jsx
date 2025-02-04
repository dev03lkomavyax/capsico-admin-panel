import { SocketProvider } from '@/socket';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const isAuthenticated = true;
    // console.log("isAuthenticated", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <SocketProvider>
            <Outlet />
        </SocketProvider>
    )
};

export default ProtectedRoute;
