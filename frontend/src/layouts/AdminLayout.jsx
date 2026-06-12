import AdminSidebar from "../pages/admin/AdminSidebar";

function AdminLayout({

  children

}) {

  return (

    <div className="flex">

      <AdminSidebar />

      <main className="flex-1">

        {children}

      </main>

    </div>

  );

}

export default AdminLayout;