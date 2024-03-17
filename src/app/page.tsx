import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <h1 className="text-8xl">Welcome</h1>
      <Link
        href="/dashboard"
        className="rounded-lg bg-gradient-to-r from-slate-300 to-slate-500 p-3 text-gray-100 text-lg font-bold mt-4"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
