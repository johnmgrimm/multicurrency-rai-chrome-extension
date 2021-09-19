import { getUpdatedConversionRates } from '../../shared/getUpdatedConversionRates';

// This code is running as a Service worker in background but for a limited time
// Update on init in background
getUpdatedConversionRates();
