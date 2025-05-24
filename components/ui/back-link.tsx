"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft size={20} strokeWidth={2.5} className="mr-1" />
      <span className="font-semibold">Voltar</span>
    </Link>
  );
}
