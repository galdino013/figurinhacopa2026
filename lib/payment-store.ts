type OrderStatus = {
  paid: boolean;
  paymentId?: string;
};

const store = new Map<string, OrderStatus>();

export function createOrder(orderId: string) {
  if (!store.has(orderId)) {
    store.set(orderId, { paid: false });
  }
}

export function markOrderPaid(orderId: string, paymentId?: string) {
  store.set(orderId, { paid: true, paymentId });
}

export function getOrderStatus(orderId: string) {
  return store.get(orderId) ?? { paid: false };
}