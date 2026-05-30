"use client";

import * as React from "react";
import { motion } from "motion/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  User,
  Building2,
  Mail,
  MessageSquare,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InteractiveNeuralVortex } from "@/components/ui/interactive-neural-vortex-background";

// hCaptcha sitekey público de Web3Forms (compartido, funciona con cualquier access_key)
const HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const areas = [
  "Finanzas / Tesorería",
  "Cuentas por pagar",
  "Back office y soporte",
  "Compras y abastecimiento",
  "Servicios compartidos",
  "Otra área",
];

const perks = [
  { icon: Clock, text: "Respuesta en 24–48 h" },
  { icon: ShieldCheck, text: "Sin compromiso" },
  { icon: Sparkles, text: "Diagnóstico de alcance cerrado" },
];

type Status = "idle" | "sending" | "done" | "error";

const RECIPIENT = "leonidas.yauri@dignita.tech";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function Diagnostico() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const captchaRef = React.useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!captchaToken) {
      captchaRef.current?.execute();
      return;
    }

    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    data.append("access_key", ACCESS_KEY ?? "");
    data.append("subject", "Nueva solicitud de diagnóstico — dignita.tech");
    data.append("from_name", "Dignita · Web");
    data.append("h-captcha-response", captchaToken);

    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("done");
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        {/* intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <Badge>
            <Sparkles className="size-3.5 text-primary" />
            Agenda tu diagnóstico
          </Badge>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Hablemos de dónde{" "}
            <span className="text-gradient">recuperar tiempo y control</span>
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Cuéntanos qué proceso te quita más tiempo. Te respondemos con un
            primer enfoque y el mecanismo correcto para tu caso.
          </p>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {perks.map((p) => (
              <li
                key={p.text}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-from/20 to-brand-to/15 text-primary ring-1 ring-foreground/10">
                  <p.icon className="size-4" />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* form card (light) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-[2rem] border border-foreground/10 bg-card/70 p-6 shadow-xl shadow-foreground/5 backdrop-blur-sm sm:p-8"
        >
          {status === "done" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-from via-brand-via to-brand-to text-primary-foreground"
              >
                <Check className="size-8" />
              </motion.div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                ¡Gracias! Mensaje recibido
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Te contactaremos en 24–48 h para coordinar tu diagnóstico. Si es
                urgente, escríbenos a{" "}
                <a
                  href={`mailto:${RECIPIENT}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {RECIPIENT}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* honeypot anti-spam */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field icon={User} label="Nombre">
                  <input
                    required
                    name="nombre"
                    placeholder="Tu nombre"
                    className={inputCls}
                  />
                </Field>
                <Field icon={Building2} label="Empresa">
                  <input
                    required
                    name="empresa"
                    placeholder="Tu empresa"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field icon={Mail} label="Email corporativo">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="tu@empresa.com"
                  className={inputCls}
                />
              </Field>

              <Field icon={Layers} label="Área a intervenir" trailing>
                <select
                  required
                  name="area"
                  defaultValue=""
                  className={`${inputCls} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecciona un área
                  </option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                icon={MessageSquare}
                label="¿Qué proceso te quita más tiempo?"
                alignTop
              >
                <textarea
                  name="mensaje"
                  rows={3}
                  placeholder="Cuéntanos brevemente…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* hCaptcha — verificación anti-spam */}
              <div className="flex justify-center">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={HCAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  theme="light"
                  size="normal"
                />
              </div>

              {status === "error" ? (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
                  No pudimos enviarlo automáticamente. Escríbenos a{" "}
                  <a
                    href={`mailto:${RECIPIENT}?subject=Solicitud%20de%20diagn%C3%B3stico`}
                    className="font-medium underline underline-offset-4"
                  >
                    {RECIPIENT}
                  </a>{" "}
                  o reintenta.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending" || !captchaToken}
                className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-from via-brand-via to-brand-to px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Solicitar diagnóstico
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Al enviar aceptas que te contactemos sobre tu solicitud.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Neural Vortex — debajo del formulario, sobre blanco */}
      <div className="relative mt-16 h-56 w-full overflow-hidden sm:mt-20 sm:h-72">
        <InteractiveNeuralVortex className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_75%,transparent)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <p className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Menos carga manual.{" "}
            <span className="text-gradient">Más control operativo.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-foreground/12 bg-foreground/[0.03] pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50 focus:bg-foreground/[0.05] focus:ring-2 focus:ring-primary/25";

function Field({
  icon: Icon,
  label,
  children,
  trailing,
  alignTop,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  trailing?: boolean;
  alignTop?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <span className="relative block">
        <Icon
          className={`pointer-events-none absolute left-3 size-4 text-muted-foreground ${
            alignTop ? "top-3" : "top-1/2 -translate-y-1/2"
          }`}
        />
        {children}
        {trailing ? (
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        ) : null}
      </span>
    </label>
  );
}
