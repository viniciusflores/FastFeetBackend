import Deliveryman from '../models/Deliveryman';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsDeliveryman = await Deliveryman.findOne({
      where: { id: req.deliveryman_id },
    });

    if (!checkIsDeliveryman) {
      return res.status(401).json({ error: "DeliveryMan isn't correctly" });
    }

    const notifications = await Notification.find({
      user: req.deliveryman_id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
