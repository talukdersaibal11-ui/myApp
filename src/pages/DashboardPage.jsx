import { Layout } from "../components/layout/Layout";
import {
  ShoppingBag,
  Users,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Briefcase,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DashboardPage = () => {
  return (
    <Layout>
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="All Products" value="1,250" icon={<ShoppingBag size={24} />} color="bg-blue-100 text-blue-600" />
        <StatCard title="All Clients" value="540" icon={<Users size={24} />} color="bg-green-100 text-green-600" />
        <StatCard title="All Suppliers" value="85" icon={<Truck size={24} />} color="bg-yellow-100 text-yellow-600" />
        <StatCard title="Total Sales" value="$95,230" icon={<DollarSign size={24} />} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Today's Sales" value="$3,200" icon={<TrendingUp size={24} />} color="bg-green-100 text-green-600" />
        <StatCard title="Profit / Loss" value="$1,250" icon={<TrendingDown size={24} />} color="bg-red-100 text-red-600" />
        <StatCard title="Expenses" value="$2,100" icon={<CreditCard size={24} />} color="bg-orange-100 text-orange-600" />
        <StatCard title="Total Employees" value="58" icon={<Briefcase size={24} />} color="bg-teal-100 text-teal-600" />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Charts & Analytics</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          📊 Chart Placeholder
        </div>
      </div>
    </Layout>
  );
};

// ✅ Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  );
};
