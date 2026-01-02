import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trash2, Plus, Check, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];
const LEVELS = ["Weak", "Average", "Strong"];
const DIFFICULTY = ["Easy", "Medium", "Hard"];

const difficultyStyle = {
  Easy: "text-green-400 bg-green-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

export default function StudyPlanner() {
  const [activeTab, setActiveTab] = useState("plan");

  // ======= Study Plan =======
  const [examType, setExamType] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState({});
  const [dailyHours, setDailyHours] = useState("");
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");

  const toggleSubject = (sub) => {
    setSubjects((p) =>
      p.includes(sub) ? p.filter((s) => s !== sub) : [...p, sub]
    );
  };

  const generatePlan = () => {
    if (!examType || subjects.length === 0 || !dailyHours) {
      setError("Please fill all required fields");
      return;
    }

    const demoPlans = subjects.map((sub) => ({
      id: Date.now() + Math.random(),
      subject: sub,
      strength: levels[sub] || "Average",
      hours: dailyHours,
      suggestions: [
        `Revise basics of ${sub}`,
        `Solve practice questions`,
        `Weekly revision`,
      ],
    }));

    setPlans((p) => [...p, ...demoPlans]);
    setSubjects([]);
    setLevels({});
    setDailyHours("");
    setError("");
  };

  const deletePlan = (id) => {
    setPlans((p) => p.filter((i) => i.id !== id));
  };

  // ======= To-Do List =======
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState("Easy");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!taskText) return;
    setTasks((t) => [
      ...t,
      {
        id: Date.now(),
        text: taskText,
        difficulty: taskDifficulty,
        done: false,
        subtasks: [],
        newSubtaskText: "",
        newSubtaskDiff: "Easy",
      },
    ]);
    setTaskText("");
  };

  const addSubtask = (taskId) => {
    setTasks((t) =>
      t.map((task) =>
        task.id === taskId
          ? task.newSubtaskText
            ? {
                ...task,
                subtasks: [
                  ...task.subtasks,
                  {
                    id: Date.now(),
                    text: task.newSubtaskText,
                    difficulty: task.newSubtaskDiff,
                    done: false,
                  },
                ],
                newSubtaskText: "",
                newSubtaskDiff: "Easy",
              }
            : task
          : task
      )
    );
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.difficulty === filter);

  // ======= Progress Tracker =======
  const completedTasks = tasks
    .map((t) => [t.done ? 1 : 0, ...t.subtasks.map((s) => (s.done ? 1 : 0))])
    .flat()
    .reduce((a, b) => a + b, 0);

  const countByDiff = (diff) =>
    tasks
      .map((t) =>
        t.difficulty === diff && t.done
          ? 1
          : 0 + t.subtasks.filter((s) => s.difficulty === diff && s.done).length
      )
      .reduce((a, b) => a + b, 0);

  const pieData = DIFFICULTY.map((d) => ({
    name: d,
    value: countByDiff(d),
  }));

  return (
    <div className="bg-neutral-900 text-white min-h-screen flex flex-col">
      <Navbar />

      {/* TAB BUTTONS */}
      <div className="max-w-7xl mx-auto w-full px-6 mt-24 grid grid-cols-3 gap-4">
        {["plan", "todo", "progress"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`p-4 rounded-lg font-semibold ${
              activeTab === t
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {t === "plan"
              ? "Study Plan"
              : t === "todo"
              ? "To Do List"
              : "Progress Tracker"}
          </button>
        ))}
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {/* ================= STUDY PLAN ================= */}
          {activeTab === "plan" && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* LEFT */}
              <div className="space-y-5">
                <h1 className="text-3xl font-bold text-purple-600">
                  Create Your Study Plan
                </h1>

                {error && (
                  <div className="bg-red-600 px-4 py-2 rounded">{error}</div>
                )}

                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="bg-gray-800 p-3 rounded w-full"
                >
                  <option value="">Choose Exam</option>
                  <option>SEE</option>
                  <option>+2</option>
                  <option>Entrance</option>
                </select>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SUBJECTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSubject(s)}
                      className={`p-3 rounded border ${
                        subjects.includes(s)
                          ? "bg-purple-600 border-purple-500"
                          : "bg-gray-800 border-gray-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {subjects.map((s) => (
                  <div
                    key={s}
                    className="flex justify-between bg-gray-800 p-3 rounded"
                  >
                    <span>{s}</span>
                    <div className="flex gap-2">
                      {LEVELS.map((l) => (
                        <button
                          key={l}
                          onClick={() => setLevels((p) => ({ ...p, [s]: l }))}
                          className={`px-3 py-1 text-xs rounded ${
                            levels[s] === l ? "bg-purple-600" : "bg-gray-700"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <input
                  type="number"
                  placeholder="Daily Study Hours"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(e.target.value)}
                  className="bg-gray-800 p-3 rounded w-1/2"
                />

                <button
                  onClick={generatePlan}
                  className="bg-purple-600 p-3 rounded font-semibold w-1/2"
                >
                  Generate My Study Plan
                </button>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-purple-600 ml-10">
                  Your Study Plans
                </h2>

                {plans.map((p) => (
                  <div
                    key={p.id}
                    className="bg-gray-800 p-4 rounded border border-transparent hover:border-purple-600 transition ml-10"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">{p.subject}</h3>
                      <Trash2
                        size={18}
                        className="text-red-400 cursor-pointer"
                        onClick={() =>
                          setPlans((x) => x.filter((i) => i.id !== p.id))
                        }
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      {p.hours} hrs/day • {p.strength}
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {p.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= TODO ================= */}
          {activeTab === "todo" && (
            <motion.div
              key="todo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-purple-600">To Do List</h2>

              {/* Add Task */}
              <div className="flex gap-3">
                <input
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  placeholder="Add new task"
                  className="bg-gray-800 p-3 rounded w-full"
                />
                <select
                  value={taskDifficulty}
                  onChange={(e) => setTaskDifficulty(e.target.value)}
                  className="bg-gray-800 p-3 rounded"
                >
                  {DIFFICULTY.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <button onClick={addTask} className="bg-purple-600 p-3 rounded">
                  <Plus />
                </button>
              </div>

              {/* Filter */}
              <div className="flex gap-3">
                {["All", ...DIFFICULTY].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded ${
                      filter === f ? "bg-purple-600" : "bg-gray-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Task List */}
              {filteredTasks.map((t) => (
                <div key={t.id} className="bg-gray-800 p-4 rounded space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() =>
                          setTasks((x) =>
                            x.map((i) =>
                              i.id === t.id ? { ...i, done: !i.done } : i
                            )
                          )
                        }
                      />
                      <span className={t.done ? "line-through" : ""}>
                        {t.text}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          difficultyStyle[t.difficulty]
                        }`}
                      >
                        {t.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Trash2
                        size={18}
                        className="text-red-400 cursor-pointer"
                        onClick={() =>
                          setTasks((x) => x.filter((i) => i.id !== t.id))
                        }
                      />
                    </div>
                  </div>

                  {/* Subtask Input */}
                  <div className="flex gap-2 pl-6 mt-1">
                    <input
                      className="bg-gray-700 p-1 rounded w-full text-sm"
                      placeholder="Add subtask..."
                      value={t.newSubtaskText}
                      onChange={(e) =>
                        setTasks((x) =>
                          x.map((i) =>
                            i.id === t.id
                              ? { ...i, newSubtaskText: e.target.value }
                              : i
                          )
                        )
                      }
                    />
                    <select
                      className="bg-gray-700 p-1 rounded text-sm"
                      value={t.newSubtaskDiff}
                      onChange={(e) =>
                        setTasks((x) =>
                          x.map((i) =>
                            i.id === t.id
                              ? { ...i, newSubtaskDiff: e.target.value }
                              : i
                          )
                        )
                      }
                    >
                      {DIFFICULTY.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    <button
                      className="bg-purple-600 p-1 rounded"
                      onClick={() => addSubtask(t.id)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Subtasks */}
                  {t.subtasks.map((st) => (
                    <div
                      key={st.id}
                      className="flex justify-between items-center pl-6 mt-1"
                    >
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={st.done}
                          onChange={() =>
                            setTasks((x) =>
                              x.map((i) =>
                                i.id === t.id
                                  ? {
                                      ...i,
                                      subtasks: i.subtasks.map((s) =>
                                        s.id === st.id
                                          ? { ...s, done: !s.done }
                                          : s
                                      ),
                                    }
                                  : i
                              )
                            )
                          }
                        />
                        <span className={st.done ? "line-through" : ""}>
                          {st.text}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            difficultyStyle[st.difficulty]
                          }`}
                        >
                          {st.difficulty}
                        </span>
                      </div>
                      <Trash2
                        size={16}
                        className="text-red-400 cursor-pointer"
                        onClick={() =>
                          setTasks((x) =>
                            x.map((i) =>
                              i.id === t.id
                                ? {
                                    ...i,
                                    subtasks: i.subtasks.filter(
                                      (s) => s.id !== st.id
                                    ),
                                  }
                                : i
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}

          {/* ================= PROGRESS ================= */}
          {activeTab === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-purple-600">
                Progress Tracker
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded flex flex-col items-center">
                  <p className="mb-2">Task Completion Ratio</p>
                  <ResponsiveContainer width={220} height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={100}
                        label
                        paddingAngle={3}
                        cornerRadius={10}
                      >
                        {DIFFICULTY.map((d, i) => (
                          <Cell
                            key={d}
                            fill={
                              d === "Easy"
                                ? "#22c55e"
                                : d === "Medium"
                                ? "#eab308"
                                : "#ef4444"
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 p-6 rounded">
                  <p className="mb-2">Completed Tasks by Difficulty</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={pieData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.name === "Easy"
                                ? "#22c55e"
                                : entry.name === "Medium"
                                ? "#eab308"
                                : "#ef4444"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
