"use client";

type ConfigCardProps = {
  title: string;
  description: string;
  isEnabled: boolean;
  isLoading: boolean;
  onToggle: () => void;
};

export default function ConfigCard({
  title,
  description,
  isEnabled,
  isLoading,
  onToggle,
}: ConfigCardProps) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
          <div className="flex items-center mt-3">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                isEnabled ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <span
              className={`text-sm font-medium ${
                isEnabled ? "text-green-400" : "text-red-400"
              }`}
            >
              {isEnabled ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <button
          disabled={isLoading}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
            isEnabled ? "bg-blue-600" : "bg-gray-600"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={onToggle}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
              isEnabled ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
