import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>QR Code App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/create">Create QR Code</Link>
          </li>
          <li>
            <Link href="/scan">Scan QR Code</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}