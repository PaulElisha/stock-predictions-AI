/** @format */

class App {
  constructor() {}

  startServer() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

const app = new App();
app.startServer();
