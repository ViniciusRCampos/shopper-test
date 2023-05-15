import * as fs from 'fs';
import csvParser from 'csv-parser';
import IData from '../Interfaces/IData';

export default function readCSVFile(filePath: string): Promise<IData[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: any[]) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: Error) => reject(error));
  })

};

export function validateCSVFile(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let isValid = true;
    
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data: any) => {
            // Verificar se as colunas esperadas estão presentes
            if (!data.product_code || !data.new_price) {
                isValid = false;
            }
            data.product_code = Number(data.product_code)
            data.new_price = Number(data.new_price)
          // Verificar se os tipos das colunas estão corretos
          if (typeof data.product_code !== 'number' || typeof data.new_price !== 'number') {
            isValid = false;
          }
          // Outras validações específicas podem ser adicionadas aqui
        })
        .on('end', () => {
          resolve(isValid);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });
  }

export function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  
  
  
  
  
  