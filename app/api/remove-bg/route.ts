export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "Imagem não enviada." }), {
        status: 400,
      });
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key não configurada." }), {
        status: 500,
      });
    }

    const removeBgForm = new FormData();
    removeBgForm.append("image_file", file);
    removeBgForm.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: removeBgForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({
          error: "Erro ao remover fundo.",
          details: errorText,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}