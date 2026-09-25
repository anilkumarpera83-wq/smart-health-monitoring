import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { User, Role } from '../types';
import { DataTable } from '../components/UI/DataTable';
import { Modal } from '../components/UI/Modal';
import { Users, UserPlus, ShieldCheck, Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      header: 'User Name & Role',
      accessor: (row: User) => (
        <div>
          <div className="font-extrabold text-slate-900">{row.fullName}</div>
          <div className="text-[10px] font-bold text-blue-600 uppercase mt-0.5">
            {row.role?.replace('ROLE_', '').replace(/_/g, ' ') || 'USER'}
          </div>
        </div>
      ),
    },
    {
      header: 'Contact Email',
      accessor: (row: User) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Mail className="h-3.5 w-3.5 text-slate-400" />
          <span>{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Phone Number',
      accessor: (row: User) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
          <Phone className="h-3.5 w-3.5 text-slate-400" />
          <span>{row.phone || 'N/A'}</span>
        </div>
      ),
    },
    {
      header: 'Assigned District',
      accessor: (row: User) => (
        <div className="flex items-center gap-1 text-xs text-slate-700 font-medium">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          <span>{row.districtName || 'All Telangana'}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (row: User) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
          row.active ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
        }`}>
          {row.active ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {row.active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#002244]">User Accounts Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage system users, district health officers, doctors, ASHA workers, and volunteers across Telangana.
          </p>
        </div>

        <button
          onClick={() => alert('Add User Modal')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#003366] hover:bg-[#002244] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all"
        >
          <UserPlus className="h-4 w-4" /> Add New System Account
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <DataTable data={users} columns={columns} isLoading={loading} emptyMessage="No user accounts registered." />
      </div>
    </div>
  );
};
