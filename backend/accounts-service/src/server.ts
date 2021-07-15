import app from "./app";
import database from "./db";

async () => {
  try {
    const port = parseInt(`${process.env.PORT}`);

    //sincroniza com as tabelas do banco
    await database.sync();
    console.log(`Running database ${process.env.DB_NAME}`);

    app.listen(port, () => {
      console.log(`Running on port ${port}!`);
    });
  } catch (error) {
    console.log(`${error}`);
  }
};
