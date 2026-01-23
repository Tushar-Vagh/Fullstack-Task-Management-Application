export default function TaskCard({ task }) {
  const statusColor = {
    TODO: "bg-gray-200 text-gray-700",
    IN_PROGRESS: "bg-yellow-200 text-yellow-800",
    DONE: "bg-green-200 text-green-800",
  };

  return (
    <div className="card slide-up flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <span className={`text-xs px-3 py-1 rounded-full ${statusColor[task.status]}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-secondary">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
