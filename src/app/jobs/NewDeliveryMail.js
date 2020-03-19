import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova entrega disponível',
      template: 'deliveryAvailable',
      context: {
        deliveryMan: delivery.deliveryman.name,
        product: delivery.product,
        date: format(
          parseISO(delivery.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
            locale: pt,
          })
        ),
      },
    });
  }
}

export default new NewDeliveryMail();
