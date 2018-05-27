import fs from "fs";
import path from "path";
import { ITrainingData } from "./ITrainingData.interface";

abstract class DataRepository {
    public static async save(data: ITrainingData[]) {
        JSON.stringify(data);
        await fs.writeFile('./src/data/data.json', JSON.stringify(data), 'utf8', err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Data file is saved successfully.');
            } 
        });
    }

    public static async read(): Promise<ITrainingData[]> {
        const defaultData: ITrainingData[] = [{
            input: [0,0,0,0,0,0,0,0,0],
            output: [0]
        }];

        const data = fs.readFileSync('./src/data/data.json', 'utf8');
        
        return JSON.parse(data || JSON.stringify(defaultData));
    }
}

export default DataRepository;
