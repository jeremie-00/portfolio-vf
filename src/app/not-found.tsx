import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/404.png" alt="404" width={400} height={400} />
    </div>
  );
}
