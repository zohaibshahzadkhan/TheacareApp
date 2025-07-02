import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <section className="max-w-4xl mx-auto text-center py-24 px-4">
        <h1 className="text-4xl font-extrabold mb-6 text-white">
          Welcome to Theacare Demo
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Experience our advanced face detection technology
        </p>
        <Link
          href="/camera"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
        >
          Start Camera Demo
        </Link>
      </section>

    </main>
  );
}