import cron from 'node-cron';
import { MonitoringService } from '../services/monitoringService';

const monitoringService = new MonitoringService();

// Run monitoring every 30 minutes for free users, 15 minutes for paid users
export const startMonitoringJob = (): void => {
  console.log('🚀 Starting monitoring job scheduler...');
  
  // Run every 15 minutes for comprehensive monitoring
  cron.schedule('*/15 * * * *', async () => {
    console.log('⏰ Running scheduled monitoring job...');
    await monitoringService.monitorAllKeywords();
  });

  // Run immediately on startup after 10 seconds
  setTimeout(async () => {
    console.log('🔄 Running initial monitoring check...');
    await monitoringService.monitorAllKeywords();
  }, 10000);
};