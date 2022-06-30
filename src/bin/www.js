const app = require("../app/app");
const config = require("config");
const PORT = config.get("app").PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);
})