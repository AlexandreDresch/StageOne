import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={38} height={32} />
        <h2 className="text-primary-100">StageOne</h2>
      </Link>
    </nav>
  );
}
