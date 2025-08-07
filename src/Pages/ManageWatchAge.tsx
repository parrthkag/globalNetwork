import { useState } from "react";
import { toast } from "react-hot-toast";

interface WatchAge {
    id: string;
    label: string;
}

const ManageWatchAge = () => {
    const [watchAges, setWatchAges] = useState<WatchAge[]>([]);
    const [label, setLabel] = useState("");
    const [loading, _setLoading] = useState(false);

    const handleAdd = () => {
        if (!label.trim()) {
            toast.error("Label cannot be empty");
            return;
        }

        const newWatchAge: WatchAge = {
            id: Date.now().toString(),
            label: label.trim(),
        };

        setWatchAges([...watchAges, newWatchAge]);
        setLabel("");
        toast.success("Watch age added");
    };

    const handleDelete = (id: string) => {
        setWatchAges((prev) => prev.filter((item) => item.id !== id));
        toast.success("Deleted");
    };

    const handleEdit = (id: string, newLabel: string) => {
        setWatchAges((prev) =>
            prev.map((item) => (item.id === id ? { ...item, label: newLabel } : item))
        );
        toast.success("Updated");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Watch Age</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Add new age group"
                    className="input input-bordered w-full p-4 rounded-md border-yellow-400 bg-gray-800 text-white"
                />
                <button
                    onClick={handleAdd}
                    className="btn btn-primary p-4 rounded-md bg-yellow-500 text-black"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>

            <ul className="space-y-2 p-4 bg-gray-900">
                {watchAges.map((age) => (
                    <WatchAgeItem
                        key={age.id}
                        age={age}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </ul>
        </div>
    );
};

interface WatchAgeItemProps {
    age: WatchAge;
    onDelete: (id: string) => void;
    onEdit: (id: string, newLabel: string) => void;
}

const WatchAgeItem: React.FC<WatchAgeItemProps> = ({ age, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editLabel, setEditLabel] = useState(age.label);

    const handleSave = () => {
        onEdit(age.id, editLabel);
        setIsEditing(false);
    };

    return (
        <li className="flex justify-between items-center border rounded px-3 py-2">
            {isEditing ? (
                <input
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="input input-sm"
                />
            ) : (
                <span>{age.label}</span>
            )}
            <div className="flex gap-2">
                {isEditing ? (
                    <button onClick={handleSave} className="btn btn-sm btn-success">
                        Save
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-outline">
                        Edit
                    </button>
                )}
                <button onClick={() => onDelete(age.id)} className="btn btn-sm btn-error">
                    Delete
                </button>
            </div>
        </li>
    );
};

export default ManageWatchAge;