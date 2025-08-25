export const AllGodown = ({ godowns }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">#</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Name</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Manager</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Mobile</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Address</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Initial Balance</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Type</th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {godowns && godowns.length > 0 ? (
            godowns.map((godown, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm">{index + 1}</td>
                <td className="py-2 px-4 border-b text-sm">{godown.name}</td>
                <td className="py-2 px-4 border-b text-sm">{godown.manager}</td>
                <td className="py-2 px-4 border-b text-sm">{godown.mobile}</td>
                <td className="py-2 px-4 border-b text-sm">{godown.address}</td>
                <td className="py-2 px-4 border-b text-sm">{godown.initial_balance}</td>
                <td className="py-2 px-4 border-b text-sm">{godown.type}</td>
                <td className="py-2 px-4 border-b text-sm space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No godowns available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
