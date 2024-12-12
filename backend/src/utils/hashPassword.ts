const bcrypt = require('bcrypt');
const saltsRoud = 10;

// tham số nhận vào password chưa mã hoá: plainPassword - kết quả mong muốn trả về là string
export const hashPassword = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltsRoud);
    } catch (error) {
        console.log(error);
    }
};
