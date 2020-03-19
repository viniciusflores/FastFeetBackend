import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';
import Delivery from '../models/Delivery';

class FinishDeliveryController {
  async store(req, res) {
    const param = Yup.object().shape({
      deliveryId: Yup.number().required(),
    });

    if (!(await param.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let delivery = await Delivery.findByPk(req.params.deliveryId);

    /**
     * Check delivery exists
     */
    if (!delivery) {
      return res.status(400).json({ error: "Delivery don't exists" });
    }

    if (!delivery.start_date) {
      return res.status(400).json({ error: "Delivery wasn't withdrawn" });
    }

    /**
     * Check for past dates
     */
    const hourFinish = parseISO(req.body.end_date);

    if (isBefore(hourFinish, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    if (isBefore(hourFinish, delivery.start_date)) {
      return res.status(400).json({
        error: 'The finish delivery cannot was before the package withdrawal',
      });
    }

    delivery = await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new FinishDeliveryController();
