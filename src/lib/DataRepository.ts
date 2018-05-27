import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import { ITrainingData } from "./ITrainingData.interface";

abstract class DataRepository {
    public static async save(data: ITrainingData[]) {
        JSON.stringify(data);
        await mkdirp('./src/data', async (err) => {
            await fs.writeFile('./src/data/data.json', JSON.stringify(data), { encoding: 'utf8', flag: 'w' }, err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Data file is saved successfully.');
                } 
            });
        });
    }

    public static async read(): Promise<ITrainingData[]> {
        const defaultData: ITrainingData[] = [{
            input: [0,0,0,0,0,0,0,0,0],
            output: [0]
        }];

        let data = ''; 
        try {
            data = fs.readFileSync('./src/data/data.json', 'utf8');
        } catch (e) {
            console.log('Error opening data file');   
        }
        
        return JSON.parse(data || JSON.stringify(defaultData));
    }
}

export default DataRepository;
