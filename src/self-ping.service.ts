import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SelfPingService {
  private readonly logger = new Logger(SelfPingService.name);

  @Cron('*/50 * * * * *') // mỗi 50 giây
  async handlePing() {
    const API_URL = 'https://your-app-name.onrender.com/health'; // 👈 Thay bằng URL thật của bạn

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP status ${res.status}`);
      }

      this.logger.log(`✅ Self-ping OK - Status: ${res.status}`);
    } catch (error) {
      this.logger.warn(`❌ Self-ping failed: ${error.message}`);
    }
  }
}
