import ButtonLink from "@/app/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="container grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Error 404</p>
        <h1 className="mt-4 font-display text-6xl md:text-8xl">
          Page not <em className="text-plum">found</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The page you&apos;re looking for has moved, or never existed. Let&apos;s get you back to something beautiful.
        </p>
        <div className="mt-8">
          <ButtonLink href="/shop">Back to shop</ButtonLink>
        </div>
      </div>
    </main>
  );
}