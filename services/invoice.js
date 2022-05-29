import 'dotenv/config'

export const getInvoice = (id, image, cartItems) => {
  const invoice = {
    chat_id: id,
    provider_token: process.env.PROVIDER_TOKEN,
    start_parameter: 'get_access',
    photo_url: image,
    title: 'Pay Order',
    description: 'InvoiceDescription',
    currency: 'RUB',
    prices: cartItems,
    payload: {
      unique_id: `${id}_${Number(new Date())}`,
      provider_token: process.env.PROVIDER_TOKEN,
    },

    photo_size: 10,
    photo_width: 10,
    photo_height: 10,
    need_phone_number: true,
    need_email: true,
    need_shipping_address: true,
    send_phone_number_to_provider: true,
  }

  return invoice
}
