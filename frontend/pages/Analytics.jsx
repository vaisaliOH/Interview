import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Color schemes
const DIFFICULTY_COLORS = ["#22c55e", "#facc15", "#ef4444"]; // Easy: green, Medium: yellow, Hard: red
const STATUS_COLORS = ["#3b82f6", "#f59e0b", "#10b981"]; // To Do, In Progress, Done

const Analytics = () => {
  const [stats, setStats] = useState({ total: 0 });
  const [difficultyData, setDifficultyData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://interview-d45g.onrender.com/api/questions/analytics");
      const data = await res.json();

      setStats({ total: data.total });

      setDifficultyData(
        data.difficultyStats?.map((d) => ({
          name: d._id || "Unknown",
          value: d.count,
        })) || []
      );

      setStatusData(
        data.statusStats?.map((s) => ({
          name: s._id || "Unknown",
          value: s.count,
        })) || []
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-6xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 text-center md:text-left">
            📊 Interview Question Analytics
          </h2>
          <button
            onClick={fetchStats}
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading analytics...</p>
        ) : (
          <>
            <div className="text-center mb-10">
              <p className="text-xl font-semibold text-gray-700">
                Total Questions:{" "}
                <span className="text-indigo-700">{stats.total}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Difficulty Chart */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold text-center text-indigo-700 mb-4">
                  📈 Difficulty Distribution
                </h3>
                {difficultyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                        dataKey="value"
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell
                            key={`diff-${index}`}
                            fill={
                              DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-center text-gray-500">
                    No difficulty data available.
                  </p>
                )}
              </div>

              {/* Status Chart */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold text-center text-indigo-700 mb-4">
                  📌 Status Distribution
                </h3>
                {statusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell
                            key={`status-${index}`}
                            fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-center text-gray-500">
                    No status data available.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
