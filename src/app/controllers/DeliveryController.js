import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Notification from '../schemas/Notification';

class DeliveryController {
  async index(req, res) {
    const deliverys = await Delivery.findAll({
      attributes: [
        'id',
        'product',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'adress',
            'number',
            'complement',
            'district',
            'city',
            'zip_code',
          ],
        },
      ],
    });

    return res.json(deliverys);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    /**
     * Check is deliveryman id is a deliveryman
     */
    const isDeliveryman = await Deliveryman.findOne({
      id: deliveryman_id,
    });

    if (!isDeliveryman) {
      return res
        .status(401)
        .json({ error: 'You can only create deliveries with deliverymans' });
    }

    /**
     * Check is recipient id is a recipient
     */
    const isRecipient = await Recipient.findOne({
      id: recipient_id,
    });

    if (!isRecipient) {
      return res
        .status(401)
        .json({ error: 'You can only create deliveries with recipients' });
    }

    const { id } = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    /**
     * Notify appointment provider
     */
    const deliveryman = isDeliveryman;

    await Notification.create({
      content: `Novo agendamento de ${deliveryman.name} como uma nova entrega de ${product}`,
      user: deliveryman_id,
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }
}

export default new DeliveryController();
