import cron from "node-cron";
import { MonitoringService } from "../services/monitoringService";

const monitoringService = new MonitoringService();

// Run monitoring every 30 minutes
export const startMonitoringJob = (): void => {
  console.log("🚀 Starting monitoring job scheduler...");

  // Run every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    console.log("⏰ Running scheduled monitoring job...");
    await monitoringService.monitorAllKeywords();
  });

  // Run immediately on startup
  setTimeout(async () => {
    console.log("🔄 Running initial monitoring check...");
    await monitoringService.monitorAllKeywords();
  }, 5000);
};
