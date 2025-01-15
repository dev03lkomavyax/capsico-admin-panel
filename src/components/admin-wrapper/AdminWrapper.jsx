import "./wrapper.css";
import AdminSidebar from "../admin-sidebar/AdminSidebar";
import Header from "../header/Header";

const AdminWrapper = ({ children }) => {

  return (
    <div className="flex w-full">
      <AdminSidebar />
      <div className="h-full w-full">
        <Header />
        <main className={`main h-[calc(100vh-80px)] p-10 pb-5 relative overflow-y-auto bg-[#F5F7FA]`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminWrapper;