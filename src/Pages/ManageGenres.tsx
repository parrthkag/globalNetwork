import React, { useEffect, useState } from 'react';
import { Music, Save, Trash2, TrendingUp } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Genre {
    id: number;
    name: string;
}

const ManageGenres: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreName, setGenreName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // ✅ Load genres from Supabase on component mount
    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        const { data, error } = await supabase.from('genres').select('*');
        if (error) {
            console.error('Error fetching genres:', error);
        } else {
            setGenres(data || []);
        }
    };

    const handleAddOrUpdateGenre = async () => {
        if (genreName.trim() === '') return;

        if (isEditing && editId !== null) {
            const { error } = await supabase
                .from('genres')
                .update({ name: genreName })
                .eq('id', editId);

            if (error) {
                console.error('Update error:', error);
            } else {
                await fetchGenres();
                setIsEditing(false);
                setEditId(null);
                setGenreName('');
            }
        } else {
            const { error } = await supabase
                .from('genres')
                .insert([{ name: genreName }]);

            if (error) {
                console.error('Insert error:', error);
            } else {
                await fetchGenres();
                setGenreName('');
            }
        }
    };

    const handleEdit = (genre: Genre) => {
        setGenreName(genre.name);
        setIsEditing(true);
        setEditId(genre.id);
    };

    const handleDelete = async (id: number) => {
        const { error } = await supabase.from('genres').delete().eq('id', id);

        if (error) {
            console.error('Delete error:', error);
        } else {
            await fetchGenres();
            if (editId === id) {
                setIsEditing(false);
                setGenreName('');
            }
        }
    };

    return (
        <div className=" p-6 rounded-xl shadow-md text-white">

            <h1 className="text-3xl flex justify-center font-bold mb-6 text-yellow-400">Add Genres</h1>
            <p className="text-gray-400 flex justify-center mb-6">Organize content by genres and themes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left - Add/Edit Genre */}
                <div className='flex flex-col gap-5'>

                    <div className="space-y-4 bg-yellow-400/10 backdrop-blur-md border border-amber-300 p-6 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold text-gray-50">
                            {isEditing ? 'Edit Genre ✏️' : 'Add Genre '}
                        </h2>
                        <input
                            type="text"
                            value={genreName}
                            onChange={(e) => setGenreName(e.target.value)}
                            placeholder="Enter genre name"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button
                            onClick={handleAddOrUpdateGenre}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg shadow-md transition flex items-center gap-2"
                        >
                            <span className="text-xl"><Save /></span> {isEditing ? 'Update Genre' : 'Add Genre'}
                        </button>
                    </div>
                    <div className="rounded-lg p-5 border flex items-center justify-between border-yellow-400 bg-yellow-400/10 backdrop-blur-md shadow-lg">
                        <div className="flex flex-col mt-2 text-yellow-300">
                            <h2 className="text-lg font-semibold text-white">Total Genres</h2>
                            <p className="text-sm text-gray-300">Manage content genres</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-yellow-400" />
                    </div>
                </div>

                {/* Right - Existing Genres */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-50 mb-4"><Music />Existing Genres </h2>
                    <div className="p-4 rounded-lg">

                        <ul className="space-y-3">
                            {genres.map((genre) => (
                                <li
                                    key={genre.id}
                                    className="flex justify-between items-center border border-amber-300 bg-gray-800 p-4  rounded-lg shadow-md hover:bg-[#333333] transition"
                                >
                                    <span className={genre.name === 'Fantasy' ? 'text-yellow-400' : ''}>{genre.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(genre)}
                                            className="text-blue-400 hover:text-blue-600"
                                        >
                                            <span className="text-lg">✏️</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(genre.id)}
                                            className="text-red-400 hover:text-red-600"

                                        >
                                            <div className="text-lg p-2"><Trash2 /></div>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageGenres;