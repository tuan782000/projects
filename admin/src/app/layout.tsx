import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AntdRegistry>
                    {/* không nên thay đổi ở đây nó ảnh hưởng toàn bộ - ví dụ  */}
                    {/* <div className=''>div root</div> */}
                    {/* Tuy duy từ trong ra ngoài vẽ hết bên trong - trình bày ở đây */}
                    {children}
                </AntdRegistry>
            </body>
        </html>
    );
}
