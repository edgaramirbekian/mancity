import React from 'react';

//app modules
import AdminLayout from '../../HOC/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="user_dashboard">
                <div>
                    This is Your Dashboard
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;