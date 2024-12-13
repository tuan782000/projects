import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsModule } from '@/reviews/reviews.module';
import { RestaurantsModule } from '@/restaurants/restaurants.module';
import { OrdersModule } from '@/orders/orders.module';
import { OrderDetailModule } from '@/order.detail/order.detail.module';
import { MenusModule } from '@/menus/menus.module';
import { MenuItemsModule } from '@/menu.items/menu.items.module';
import { MenuItemOptionsModule } from '@/menu.item.options/menu.item.options.module';
import { LikesModule } from '@/likes/likes.module';
import { AuthModule } from '@/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        UsersModule,
        ReviewsModule,
        RestaurantsModule,
        OrdersModule,
        OrderDetailModule,
        MenusModule,
        MenuItemsModule,
        MenuItemOptionsModule,
        LikesModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true // sử dụng .env này toàn dự án
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI')
            }),
            inject: [ConfigService]
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    // ignoreTLS: true,
                    // secure: false,
                    auth: {
                        user: configService.get<string>('MAIL_USER'),
                        pass: configService.get<string>('MAIL_PASSWORD')
                        // user: process.env.MAILDEV_INCOMING_USER,
                        // pass: process.env.MAILDEV_INCOMING_PASS
                    }
                }
                // defaults: {
                //     from: '"No Reply" <no-reply@localhost>'
                // }
                // preview: true,
                // template: {
                //     dir: process.cwd() + '/template/',
                //     adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                //     options: {
                //         strict: true
                //     }
                // }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
