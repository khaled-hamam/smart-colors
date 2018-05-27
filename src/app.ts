import express from "express";
import morgan from "morgan";
import path from "path";

class App {
    public async start() {
        const app: express.Application = express();

        // Serving Views
        app.set('views', path.join(__dirname, '../src/views'))
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

        app.get('*', (req, res) => {
            if (req.url !== '/') {
                res.redirect('/');
            }
        });
    }
}

const app = new App();
app.start();
