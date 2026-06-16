"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";

type Etapa = "dados" | "ajuste" | "finalizar";

export default function CriarPage() {
  const [etapa, setEtapa] = useState<Etapa>("dados");

  const [nome, setNome] = useState("NOME JOGADOR");
  const [data, setData] = useState("14/07/2000");
  const [altura, setAltura] = useState("1,69");
  const [peso, setPeso] = useState("10 kg");
  const [clube, setClube] = useState("BRASIL");

  const [imagem, setImagem] = useState<string | null>(null);
  const [arquivoOriginal, setArquivoOriginal] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [zoom, setZoom] = useState(1.15);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(8);

  const [fundoRemovido, setFundoRemovido] = useState(false);

  function handleImagemChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setArquivoOriginal(file);
    const imageUrl = URL.createObjectURL(file);
    setImagem(imageUrl);
    setFundoRemovido(false);
    setEtapa("dados");

    setZoom(1.15);
    setPosX(0);
    setPosY(8);
  }

  async function handleRemoveBackground() {
    if (!arquivoOriginal) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", arquivoOriginal);

      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.error || "Erro ao remover fundo.");
        return;
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setImagem(imageUrl);
      setFundoRemovido(true);
      setEtapa("ajuste");
    } catch (error) {
      alert("Erro ao processar a imagem.");
    } finally {
      setLoading(false);
    }
  }

  function handleContinuarParaAjuste() {
    if (!imagem) {
      alert("Envie uma foto primeiro.");
      return;
    }
    setEtapa("ajuste");
  }

  function handleContinuarParaFinalizar() {
    setEtapa("finalizar");
  }

  function handleVoltarParaAjuste() {
    setEtapa("ajuste");
  }

  const imageStyle = useMemo(
    () => ({
      transform: `translate(${posX}px, ${posY}px) scale(${zoom})`,
      transformOrigin: "center bottom",
    }),
    [zoom, posX, posY]
  );

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Figurinha oficial
            </p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">
              Editor da figurinha
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Voltar
          </Link>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
              etapa === "dados"
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                : "border-white/10 bg-white/5 text-zinc-300"
            }`}
          >
            1. Dados e foto
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
              etapa === "ajuste"
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                : "border-white/10 bg-white/5 text-zinc-300"
            }`}
          >
            2. Ajustar foto
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
              etapa === "finalizar"
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                : "border-white/10 bg-white/5 text-zinc-300"
            }`}
          >
            3. Finalizar e pagar
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[450px_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              {etapa === "dados" && "Dados"}
              {etapa === "ajuste" && "Ajuste da foto"}
              {etapa === "finalizar" && "Finalização"}
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Nome do jogador
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value.toUpperCase())}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Data
                  </label>
                  <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Altura
                  </label>
                  <input
                    type="text"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Peso
                  </label>
                  <input
                    type="text"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Clube / Time
                </label>
                <input
                  type="text"
                  value={clube}
                  onChange={(e) => setClube(e.target.value.toUpperCase())}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Foto do cliente
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemChange}
                  className="block w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-semibold file:text-black"
                />
              </div>

              {etapa === "dados" && (
                <>
                  <button
                    type="button"
                    onClick={handleRemoveBackground}
                    disabled={!arquivoOriginal || loading}
                    className="w-full rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Recortando..." : "Remover fundo da foto"}
                  </button>

                  <button
                    type="button"
                    onClick={handleContinuarParaAjuste}
                    disabled={!imagem}
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continuar para ajuste
                  </button>
                </>
              )}

              {etapa === "ajuste" && (
                <>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
                    <p className="mb-4 text-sm font-semibold text-zinc-300">
                      Ajuste fino da foto
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm text-zinc-400">
                          Zoom: {zoom.toFixed(2)}x
                        </label>
                        <input
                          type="range"
                          min="0.7"
                          max="2.2"
                          step="0.01"
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm text-zinc-400">
                          Horizontal: {posX}px
                        </label>
                        <input
                          type="range"
                          min="-160"
                          max="160"
                          step="1"
                          value={posX}
                          onChange={(e) => setPosX(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm text-zinc-400">
                          Vertical: {posY}px
                        </label>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="1"
                          value={posY}
                          onChange={(e) => setPosY(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                    {fundoRemovido
                      ? "Fundo removido com sucesso. Agora ajuste a posição e o zoom antes de continuar."
                      : "Você pode continuar mesmo sem remover o fundo, mas o melhor resultado é com a imagem recortada."}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setEtapa("dados")}
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                    >
                      Voltar
                    </button>

                    <button
                      type="button"
                      onClick={handleContinuarParaFinalizar}
                      className="w-full rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
                    >
                      Continuar
                    </button>
                  </div>
                </>
              )}

              {etapa === "finalizar" && (
                <>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-sm text-zinc-300">
                    A figurinha já está pronta visualmente. O próximo passo é conectar o pagamento e liberar o download em PNG/PDF após a aprovação.
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleVoltarParaAjuste}
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                    >
                      Voltar ao ajuste
                    </button>

                    <button
                      type="button"
                      className="w-full rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-400"
                    >
                      Ir para pagamento
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
            <div className="relative aspect-[885/1260] w-full max-w-[430px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
              <img
                src="/assets/molde.png"
                alt="Molde oficial da figurinha"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute left-1/2 top-[115px] z-10 flex h-[555px] w-[290px] -translate-x-1/2 items-end justify-center overflow-hidden">
                {imagem ? (
                  <img
                    src={imagem}
                    alt="Jogador recortado"
                    style={imageStyle}
                    className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.20)]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-bold text-white/90">
                    Envie e recorte a foto
                  </div>
                )}
              </div>

              <div className="absolute bottom-[72px] left-[42.5%] z-20 w-[440px] -translate-x-1/2 px-8 text-center">
                <div className="truncate text-[31px] font-black uppercase leading-none tracking-tight text-white">
                  {nome || "NOME JOGADOR"}
                </div>
              </div>

              <div className="absolute bottom-[50px] left-[42.5%] z-20 w-[445px] -translate-x-1/2 px-8 text-center">
                <div className="text-[17px] font-bold leading-none text-white">
                  {data || "4-2-1988"} &nbsp; | &nbsp; {altura || "1,69"} &nbsp; | &nbsp; {peso || "98 kg"}
                </div>
              </div>

              <div className="absolute bottom-[12px] left-[35.5%] z-20 w-[350px] -translate-x-1/2 px-4 text-center">
                <div className="truncate text-[18px] font-bold uppercase leading-none text-white">
                  {clube || "TIME TM (BRA)"}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}