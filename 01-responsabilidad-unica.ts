class Database {
  connectionDatabase() {
    const config = {
      host: "localhost",
      user: "userx",
      pass: "12345",
      port: 1552,
      sid: "dev-insurance",
    };

    return {
      insert: (name: string) => {},
      update: (id: number, name: string) => {},
      delete: (id: number) => {},
    };
  }
}

class User {
  insert(name: string) {
    const database = new Database();
    const connection = database.connectionDatabase();
    connection.insert(name.toUpperCase());
  }

  update(id: number, name: string) {
    const database = new Database();
    const connection = database.connectionDatabase();
    connection.update(id, name.toUpperCase());
  }

  delete(id: number) {
    const database = new Database();
    const connection = database.connectionDatabase();
    connection.delete(id);
  }
}
