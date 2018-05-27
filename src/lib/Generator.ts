import { ITrainingData } from "./ITrainingData.interface";
import Color from "./Color";
import DataRepository from "./DataRepository";

const brain = require('brain.js');

class Generator {
    constructor(private net: any = new brain.NeuralNetwork(), private dataset: ITrainingData[] = []) {
        // Load Data set
        DataRepository.read().then(data => {
            this.dataset = data;
            this.trainDataSet();
        });
    }
    
    get Net() {
        return this.net;
    }

    public async train(data: ITrainingData) {
        // Inserting the new training data to the dataset
        this.dataset.push(data);

        // Retraining the network with the new dataset
        await this.trainDataSet();
    }

    private async trainDataSet() {
        if (this.dataset.length > 0) {
            await this.net.trainAsync(this.dataset)
                .then((data: any) => {
                    console.log('Training Successful');
                    // Save the new Dataset
                    DataRepository.save(this.dataset);
                })
                .catch(() => {
                    console.error('Error occured in training');
                })
        }
    }

    public generateColors(): any[] {
        let results: { a: Color, b: Color, c: Color, score: number }[] = [];

        if (this.dataset.length == 0)
            return results;

        // Generating Random Colors
        for (let i = 0; i < 1e5; ++i) {
            let a = new Color(),
                b = new Color(),
                c = new Color();

            const [score] = this.net.run([
                ...a.getNormalizedColors(),
                ...b.getNormalizedColors(),
                ...c.getNormalizedColors()
            ]);

            results.push({ a, b, c, score });
        }

        // Sorting Colors according to Score
        results = results.sort((a, b) => {
            return b.score - a.score;
        });

        // Limiting results to 20 color combination
        return results.slice(0, 20);
    }
}

export default new Generator();
