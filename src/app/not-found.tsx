import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted-foreground">
        El enlace que seguiste no lleva a ninguna parte. Volvamos a la operación.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-brand-from via-brand-via to-brand-to px-6 text-sm font-medium text-primary-foreground transition hover:brightness-110"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
