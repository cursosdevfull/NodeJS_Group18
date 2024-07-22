class User {
    private readonly userId: number
    private name: string
    private lastname: string
    private email: string

    constructor(name: string, lastname: string, email: string, userId?: number) {
        this.name = name
        this.lastname = lastname
        this.email = email
        this.userId = userId ?? new Date().getTime()
        // userId || new Date().getTime()
    }

    insert() {
        const database = this.getDatabase()
        console.log(database.insert(this.userId, this.name, this.lastname, this.email))
    }

    update(name: string, lastname: string, email: string) {
        const database =this.getDatabase()
        console.log(database.update(this.userId, this.name, this.lastname, this.email))
    }

    delete() {
        const database =this.getDatabase()
        console.log(database.delete(this.userId))
    }

    getDatabase() {
        const {host, user, pass, port, sid} = this.getConnectionParameters()
        return this.getConnection()
    }

    getConnectionParameters() {
        return {
            host: "localhost",
            user: "user01",
            pass: "pass01",
            port: 1521,
            sid: "xdev"
        }
    }

    getConnection() {
        return {
            insert: (userId: number, name: string, lastname: string, email: string) {
                return "user inserted"
            },
            update(userId: number, name: string, lastname: string, email: string) {
                return "user updated"
            },
            delete(userId: number) {
                return "user deleted"
            }

        }
    }
}


const user = new User("Magaly", "Cárdenas", "magaly.cardenas@email.com")
user.insert()
user.update("Marlene", "Cárdenas", "marlene.cardenas@email.com")
user.delete()