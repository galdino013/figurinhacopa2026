import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          Personalize sua figurinha
        </span>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
          Crie sua figurinha personalizada em estilo profissional
        </h1>

        <p className="mt-6 max-w-2xl text-base text-zinc-300 md:text-lg">
          Envie sua foto, remova o fundo automaticamente, personalize os dados
          e gere uma figurinha pronta para compartilhar ou imprimir.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/criar"
            className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Criar minha figurinha
          </Link>

          <a
            href="#como-funciona"
            className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Como funciona
          </a>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">1. Envie sua foto</h2>
            <p className="mt-3 text-zinc-300">
              Selecione a imagem que será usada na figurinha.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">2. Remova o fundo</h2>
            <p className="mt-3 text-zinc-300">
              Faça o recorte automático da pessoa com um clique.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">3. Gere a figurinha</h2>
            <p className="mt-3 text-zinc-300">
              Personalize nome, país e dados e veja a prévia final.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}