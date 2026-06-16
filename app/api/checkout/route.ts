import { Preference } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { createOrder } from "@/lib/payment-store";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return Response.json({ error: "orderId obrigatório" }, { status: 400 });
    }

    createOrder(orderId);

    const preference = new Preference(mpClient);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const result = await preference.create({
      body: {
        items: [
          {
            id: orderId,
            title: "Figurinha personalizada",
            description: "Download em PNG e PDF após pagamento",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 12.9,
          },
        ],
        back_urls: {
          success: `${baseUrl}/criar?orderId=${orderId}&success=1`,
          failure: `${baseUrl}/criar?orderId=${orderId}&failure=1`,
          pending: `${baseUrl}/criar?orderId=${orderId}&pending=1`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/mercadopago-webhook`,
        external_reference: orderId,
      },
    });

    return Response.json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Erro ao criar pagamento no Mercado Pago" },
      { status: 500 }
    );
  }
}