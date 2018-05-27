import express from "express";
import * as bodyParser from "body-parser";

import generator from "../lib/Generator";
import Color from "../lib/Color";

class ColorController {
    public start(app: express.Application) {
        // Using body-parser
        const urlencodedParser = bodyParser.urlencoded({ extended: true });

        // Handling GET requests
        app.get('/', (req, res) => {
            // Generating Colors
            let generatedColors: any[] = generator.generateColors();
            res.render('index', { data: generatedColors });
        });

        // Handling POST requests
        app.post('/', urlencodedParser, (req, res) => {
            // Train the Network with the new combination data
            const {a, b, c, score} = req.body;
            let aColor: Color = new Color(a.r, a.g, a.b),
                bColor: Color = new Color(b.r, b.g, b.b),
                cColor: Color = new Color(c.r, c.g, c.b);

            generator.train({
                input: [
                    ...aColor.getNormalizedColors(),
                    ...bColor.getNormalizedColors(),
                    ...cColor.getNormalizedColors()
                ],
                output: [score]
            });

            res.sendStatus(201);
        });
    }
}

export default new ColorController();