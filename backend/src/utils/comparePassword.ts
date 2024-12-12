const bcrypt = require('bcrypt');
const saltsRoud = 10;

// plainPassword: password gửi lên
// hashedPassword dữ liệu dưới db
export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.log(error);
    }
};
