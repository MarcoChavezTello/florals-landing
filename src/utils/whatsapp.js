export function whatsappLink(phone, msg = "") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}