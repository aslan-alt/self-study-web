import md5 from "md5";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Comment } from "./entity/Comment";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

createConnection().then(async connection => {
    const { manager } = connection
    const u1 = new User()
    u1.username = 'frank'
    u1.passwordDigest = md5('123213123')
    await manager.save(u1)
    const p1 = new Post()
    p1.title = '我的第一篇博客'
    p1.content = 'My First Post'
    p1.author = u1
    await manager.save(p1)
    const c1 = new Comment()
    c1.user = u1
    c1.post = p1
    c1.content = '厉害了'
    await manager.save(c1)
    connection.close()
}).catch(error => console.log(error));
