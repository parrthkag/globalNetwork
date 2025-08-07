import type { FormEvent } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Film, Image, Upload } from "lucide-react";
import Select from "react-select";

const options = [
    { value: "Romance", label: "Romance" },
    { value: "Mystery", label: "Mystery" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Thriller", label: "Thriller" },
    { value: "Adventure", label: "Adventure" },
];


const UploadContent = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [releaseYear, setReleaseYear] = useState<string>("");
    const [genres, setGenres] = useState<string[]>([]);
    const [watchAge, setWatchAge] = useState<string>("");
    const [poster, setPoster] = useState<File | null>(null);
    const [backdrop, setBackdrop] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");

    const uploadFile = async (file: File | null, folder: string): Promise<string | null> => {
        if (!file) return null;
        const filename = `${folder}/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("media").upload(filename, file);
        if (error) throw error;
        const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(filename);
        return publicUrl.publicUrl;
    };

    const mutation = useMutation({
        mutationFn: async () => {
            const posterUrl = await uploadFile(poster, "posters");
            const backdropUrl = await uploadFile(backdrop, "backdrops");
            const videoUrl = await uploadFile(video, "videos");

            const { error } = await supabase.from("content").insert([
                {
                    title,
                    description,
                    release_year: releaseYear,
                    genres,
                    watch_age: watchAge,
                    poster_url: posterUrl,
                    backdrop_url: backdropUrl,
                    video_url: videoUrl,
                },
            ]);
            if (error) throw error;
        },
        onSuccess: () => {
            setMessage("Content uploaded successfully!");
            setTitle("");
            setDescription("");
            setReleaseYear("");
            setGenres([]);
            setWatchAge("");
            setPoster(null);
            setBackdrop(null);
            setVideo(null);
        },
        onError: (err: Error) => {
            setMessage(`Error: ${err.message}`);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <div className="py-6 pl-20 bg-gray-800  text-white">
            <h1 className="text-3xl font-bold mb-6">Upload Content</h1>
            {message && <div className="bg-green-500 p-3 mb-6 rounded">{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-4 flex  flex-col items-center rounded-lg border border-yellow-400 text-center">
                        <div className="text-yellow-400 mb-2"><Image /></div>
                        <p className="text-sm mb-2">Choose poster image</p>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                        <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files?.[0] || null)} className="mt-2 pl-[120px] text-white" />
                        {poster && <img src={URL.createObjectURL(poster)} alt="poster" className="w-32  mt-2 " />}
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-yellow-400 text-center">
                        <div className="text-yellow-400 mb-2"><Image /></div>
                        <p className="text-sm mb-2">Choose backdrop image</p>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                        <input type="file" accept="image/*" onChange={(e) => setBackdrop(e.target.files?.[0] || null)} className="mt-2 pl-[36px] text-white" />
                        {backdrop && <img src={URL.createObjectURL(backdrop)} alt="backdrop" className="w-32 mt-2 mx-auto" />}
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-yellow-400 text-center">
                        <div className="text-yellow-400 mb-2"><Film /></div>
                        <p className="text-sm mb-2">Choose video file</p>
                        <p className="text-xs text-gray-400">MP4, AVI, MOV, WEBM up to 500MB</p>
                        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] || null)} className="mt-2 pl-[36px] text-white" />
                        {video && <p className="text-sm mt-2">{video.name}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm mb-2">Duration (minutes)</label>
                        <input
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            type="number"
                            placeholder="e.g., 120"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Release Year</label>
                        <input
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            type="number"
                            placeholder="e.g., 2024"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="block text-sm mr-4">Average Rating (1-10)</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mr-4 accent-blue-500"
                    />
                    <span className="text-yellow-400">5</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm mb-2">Watch Age Rating</label>
                        <select
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            value={watchAge}
                            onChange={(e) => setWatchAge(e.target.value)}
                        >
                            <option value="">Select Age Rating</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Genre Category</label>
                        <Select
                            isMulti
                            name="genres"
                            options={options}
                            className="basic-multi-select text-black bg-gray-900"
                            classNamePrefix="select"
                            value={options.filter((option) => genres.includes(option.value))}
                            onChange={(selectedOptions) =>
                                setGenres(selectedOptions.map((option) => option.value))
                            }
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "#1f2937", // Tailwind's bg-gray-800
                                    color: "white",
                                    borderColor: "#374151", // Tailwind's border-gray-700
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#1f2937", // dropdown menu background
                                    color: "white",
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#374151",
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "#9ca3af", // Tailwind's text-gray-400
                                }),
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Content Type</label>
                        <select
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                        >
                            <option value="">Select Content Type</option>
                            <option value="Movie">Movie</option>
                            <option value="Series">Series</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Release Type</label>
                        <select
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                            <option value="">Select Release Type</option>
                            <option value="Theatrical">Theatrical</option>
                            <option value="Streaming">Streaming</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-3 px-6 rounded-lg shadow-md w-full flex items-center justify-center"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                        "Uploading..."
                    ) : (
                        <>
                            <Upload className="inline-block mr-2" />
                            Upload Movie
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default UploadContent;