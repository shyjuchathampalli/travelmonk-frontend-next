export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Trip not found
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        The destination you’re looking for doesn’t exist.
      </p>
    </div>
  );
}