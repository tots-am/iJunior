import { Dados } from "./interface";
import fs from 'fs';
import csv from 'csv-parser';

export const readCSV = async (filePath: string): Promise<Dados[]> => {
    return new Promise((resolve, reject) => {
      const results: Dados[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Dados) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
};