import { ITrainingData } from "./ITrainingData.interface";
const brain = require('brain.js');

class Generator {
    constructor(private net: any = new brain.NeuralNetwork(), private dataset: ITrainingData[] = []) {
        // TODO: Load Data set
        this.trainDataSet();
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
                    // TODO: Save the new Dataset
                })
                .catch(() => {
                    console.error('Error occured in training');
                })
        }
    }
}

export default new Generator();
