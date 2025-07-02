
export default function Home() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center p-10 gap-10">
      <section className="max-w-md text-center md:text-left">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to Theacare Demo</h1>
        <p className="mb-4 text-lg text-gray-700">
          Check if your face is centered and lighting is good directly on this page.
        </p>
      </section>
    </main>
  );
}
