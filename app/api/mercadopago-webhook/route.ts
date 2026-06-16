import { markOrderPaid } from "@/lib/payment-store";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");

    if (!topic || !id) {
      return new Response("ok", { status: 200 });
    }

    if (topic !== "payment") {
      return new Response("ok", { status: 200 });
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN!;
    const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!paymentResponse.ok) {
      return new Response("payment lookup failed", { status: 500 });
    }

    const payment = await paymentResponse.json();

    const status = payment.status;
    const orderId = payment.external_reference;

    if (status === "approved" && orderId) {
      markOrderPaid(orderId, String(payment.id));
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("error", { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}