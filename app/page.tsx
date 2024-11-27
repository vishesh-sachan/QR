import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-100 text-gray-800">

      <header className="mt-10">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          QR Code App
        </h1>
      </header>

      <nav className="mt-10">
        <ul className="flex">
          <li>
            <Link
              href="/create"
              className="px-6 py-3 m-10 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Create QR Code
            </Link>
          </li>
          <li>
            <Link
              href="/scan"
              className="px-6 py-3 m-10 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Scan QR Code
            </Link>
          </li>
        </ul>
      </nav>

      <footer className="mt-10 mb-6">
        <p className="text-center text-gray-600">
          Made with ❤️ by{" "}
          <span className="text-blue-500 font-semibold">
            Vishesh Sachan
          </span>
        </p>
      </footer>
    </div>
  );
}