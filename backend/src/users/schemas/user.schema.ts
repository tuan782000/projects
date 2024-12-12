import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string; // email - duy nhất

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    image: string;

    @Prop({ default: 'USER' })
    role: string; // user và admin

    @Prop({ default: 'LOCAL' })
    accountType: string; // local: "đăng nhập email password", google, github

    @Prop({ default: false })
    isActive: boolean; // email - xác thực - chuyển từ false -> true

    @Prop()
    codeId: string;

    @Prop()
    codeExpired: Date; // code gửi tới email sẽ hết hạn 5p
}

export const UserSchema = SchemaFactory.createForClass(User);
