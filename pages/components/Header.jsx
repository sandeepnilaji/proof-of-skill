export default function Header() {
  return (
    <div className="p-4 bg-gray-100 w-full rounded-[8px]">
      <h1 className="text-xl font-bold">Post UX Designer</h1>
      <div className="flex space-x-4 mt-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Compare View
        </button>
        <button className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded">
          Individual View
        </button>
        <button className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded">
          Shortlisted Candidates
        </button>
      </div>
    </div>
  );
}
