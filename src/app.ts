import express from "express";
import morgan from "morgan";
import Color from "./models/color";

class App {
    public async start() {
        const app: express.Application = express();

        // Setting View Template Engine
        app.set('view engine', 'ejs');
        // Serving Static Files
        app.use(express.static('public'));
        // Using Morgan for Logging
        app.use(morgan('combined'));

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    }
}

const app = new App();
app.start();
