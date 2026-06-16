import { getOrderStatus } from "@/lib/payment-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return Response.json({ error: "orderId obrigatório" }, { status: 400 });
  }

  return Response.json(getOrderStatus(orderId));
}