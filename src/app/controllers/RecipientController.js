import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      adress: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const {
      id,
      name,
      adress,
      number,
      complement,
      district,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      adress,
      number,
      complement,
      district,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      adress: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    const {
      name,
      adress,
      number,
      complement,
      district,
      city,
      zip_code,
    } = req.body;

    const recipient = await Recipient.findOne({
      where: { name: req.body.name },
    });

    const { id } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      adress,
      number,
      complement,
      district,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
