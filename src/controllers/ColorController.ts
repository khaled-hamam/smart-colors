import express from "express";
import * as bodyParser from "body-parser";

class ColorController {
    public start(app: express.Application) {
        // Using body-parser
        const urlencodedParser = bodyParser.urlencoded({ extended: false });

        // Handling GET requests
        app.get('/', (req, res) => {
            // TODO: Generating Colors
            res.render('index');
        });

        // Handling POST requests
        app.post('/:combination', (req, res) => {
            // TODO: Train the Network with the new combination data
        });
    }
}

export default new ColorController();