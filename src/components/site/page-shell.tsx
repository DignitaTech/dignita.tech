import * as React from "react";
import { SectionHeading } from "@/components/site/section-heading";

export function PageShell({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading kicker={kicker} title={title} description={description} />
        <div className="mt-14">{children}</div>
      </div>
    </main>
  );
}
