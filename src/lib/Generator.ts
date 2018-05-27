import { ITrainingData } from "./ITrainingData.interface";
const brain = require('brain.js');

class Generator {
    constructor(private net: any, private dataset: ITrainingData[] = []) {
        this.net = new brain.recurrent.RNN();
    }
    
    get Net() {
        return this.net;
    }

    public train(data: ITrainingData) {
        this.net.train(data);
    }

    private trainDataSet() {
        for (let data of this.dataset) {
            this.train(data);
        }
    }
}