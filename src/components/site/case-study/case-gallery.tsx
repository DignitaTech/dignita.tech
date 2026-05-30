import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { CaseStudyImage } from "@/lib/ecosystem";

export function CaseGallery({ images }: { images: CaseStudyImage[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((img, i) => (
        <Reveal
          key={img.src}
          delayIndex={i % 2}
          className={img.wide ? "sm:col-span-2" : undefined}
        >
          <div
            className={`relative overflow-hidden rounded-3xl ring-1 ring-foreground/10 ${
              img.wide ? "aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={
                img.wide
                  ? "(max-width: 1152px) 100vw, 1152px"
                  : "(max-width: 640px) 100vw, 576px"
              }
              className="object-cover"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
