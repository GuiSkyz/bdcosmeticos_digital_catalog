"use client";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-20">
      <Separator className="bg-bd-salmon/10" />
      <div className="py-16 md:py-20 text-center px-8">
        <div className="flex justify-center mb-6">
          <Image 
            src="/brand-logo-v2.png" 
            alt="BD Cosméticos Logo" 
            width={200} 
            height={200} 
            className="object-contain w-auto h-20 md:h-28"
          />
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-bd-warm-gray mb-6">
          Alta Perfumaria Importada
        </p>
        <Separator className="max-w-24 mx-auto bg-bd-salmon/20 mb-6" />
        <p className="text-[10px] uppercase tracking-widest text-bd-warm-gray/60">
          &copy; {new Date().getFullYear()} BD Cosméticos • Todos os direitos
          reservados
        </p>
      </div>
    </footer>
  );
}
