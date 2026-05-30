import type { Metadata } from "next";
import { Diagnostico } from "@/components/site/diagnostico";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Agenda tu diagnóstico con Dignita.",
};

export default function ContactoPage() {
  return (
    <main className="relative pt-16">
      <Diagnostico />
    </main>
  );
}
