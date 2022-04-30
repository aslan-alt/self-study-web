import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { User } from "src/entity/User";

export class SignIn {
    username: string;
    password: string;
    user: User;
    errors = { username: [] as string[], password: [] as string[] }
    async validate() {
        if (this.username.trim() === '') {
            this.errors.username.push('')
        }
        const connection = await getDatabaseConnection()
        let user
        try {
            user = await connection.manager.findOne(User, { where: { username: this.username } })
        } catch (e) {
            user = null
        }
        this.user = user
        if (user) {
            if (user.passwordDigest !== md5(this.password)) {
                this.errors.password.push('密码与用户名不匹配')
            }
        } else {
            this.errors.username.push('用户名不存在')
        }
    }
    hasErrors() {
        return (!!Object.values(this.errors).find(v => v.length > 0))
    }

}