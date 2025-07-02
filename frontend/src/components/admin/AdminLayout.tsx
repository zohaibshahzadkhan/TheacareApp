"use client";

type AdminLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AdminLayout({
  title,
  subtitle,
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">System Configuration</h2>
            <p className="text-blue-100 mt-1">Toggle features on or off</p>
          </div>
          <div className="p-8 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}