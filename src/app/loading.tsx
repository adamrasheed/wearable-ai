export default function Loading() {
  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-48"></div>
        <div className="h-10 bg-gray-200 rounded-2xl mb-4"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
      </div>
    </div>
  );
}
