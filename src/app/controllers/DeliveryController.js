import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

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

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  // async show(req, res) {
  //   const { deliverymanId } = req.params;
  //   if (!deliverymanId) {
  //     return res.status(400).json({ error: 'Invalid param' });
  //   }

  //   const deliverymans = await Deliveryman.findOne({
  //     where: { id: deliverymanId },
  //     include: [
  //       {
  //         model: File,
  //         as: 'avatar',
  //         attributes: ['name', 'path', 'url'],
  //       },
  //     ],
  //   });

  //   return res.json(deliverymans);
  // }

  // async update(req, res) {
  //   const param = Yup.object().shape({
  //     deliverymanId: Yup.number().required(),
  //   });

  //   if (!(await param.isValid(req.params))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const schema = Yup.object().shape({
  //     name: Yup.string(),
  //     email: Yup.string().email(),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

  //   if (!deliveryman) {
  //     return res.status(401).json({ error: 'Deliveryman not found' });
  //   }

  //   if (!req.body.email) {
  //     const userExists = await Deliveryman.findOne({
  //       where: { email: req.body.email },
  //     });

  //     if (userExists) {
  //       return res
  //         .status(400)
  //         .json({ error: 'Another Deliveryman already use this email.' });
  //     }
  //   }

  //   const { id, name, email } = await deliveryman.update(req.body);

  //   return res.json({ id, name, email });
  // }

  // async destroy(req, res) {
  //   const schema = Yup.object().shape({
  //     deliverymanId: Yup.number().required(),
  //   });

  //   if (!(await schema.isValid(req.params))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

  //   if (!deliveryman) {
  //     return res.status(401).json({ error: 'Deliveryman not found' });
  //   }

  //   await deliveryman.destroy({
  //     where: { id: deliveryman.id },
  //   });

  //   return res.json({ message: 'The user was removed' });
  // }
}

export default new DeliveryController();
