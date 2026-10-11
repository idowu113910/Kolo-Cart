import app from "./app.js";
import { common } from "./config/env.js";
import connectToDatabse from "./mongodb/mongodb.js";

const PORT = common.PORT || 5500;

app.listen(PORT, async () => {
  console.log(`server working at port ${PORT}`);

  await connectToDatabse();
});
