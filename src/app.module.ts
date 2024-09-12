import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude({
      path: 'product',
      method: RequestMethod.GET,
    }).forRoutes(ProductController);
  }
}
