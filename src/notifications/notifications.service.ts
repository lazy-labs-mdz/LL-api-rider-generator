import { Injectable } from '@nestjs/common';


const notification_center = {
  "created-user": () => {},
  "updated-password": () => {},
  "reset-password": () => {},
  "user-invitation": () => {},
  "rider-shared": () => {}
}

@Injectable()
export class NotificationsService {

  sendNotification(user, notification) {
    const userData = user._doc;
    if (notification_center[notification]) {
      notification_center[notification](userData);
    }
  }

}
