import * as Yup from 'yup';
import {
  parseISO,
  isBefore,
  isAfter,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
import Delivery from '../models/Delivery';

class WithdrawalController {
  async store(req, res) {
    const param = Yup.object().shape({
      deliveryId: Yup.number().required(),
    });

    if (!(await param.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
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

    /**
     * Check for past dates
     */
    const hourStart = parseISO(req.body.start_date);

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    if (
      isBefore(
        hourStart,
        setSeconds(setMinutes(setHours(new Date(hourStart), 8), 0), 0)
      ) ||
      isAfter(
        hourStart,
        setSeconds(setMinutes(setHours(new Date(hourStart), 18), 0), 0)
      )
    ) {
      return res.status(400).json({ error: 'Invalid time to withdrawal' });
    }

    delivery = await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new WithdrawalController();
