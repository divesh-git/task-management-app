import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as promClient from 'prom-client';  // Import Prometheus client

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080', // or '*', or use a function for dynamic checking
    credentials: true, // if you're using cookies or Authorization headers
  });
  // Config service for reading environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Create Prometheus registry and collect default metrics
  if (promClient.register.getMetricsAsArray().length === 0) {
    promClient.collectDefaultMetrics();
  }
  
  // Expose /metrics endpoint for Prometheus to scrape
  app.use('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics();  
    res.end(metrics);
  });
  

  await app.listen(port,'0.0.0.0');
}

bootstrap();
