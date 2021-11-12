import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {

    private readonly _envConfig: {
        [key: string]: string
    };

    constructor(

    ) {

        const isDevEnv = process.env.NODE_ENV !== 'production';

        if(isDevEnv) {
            
            const envFilePath = __dirname + '/../../.env';
            const existsPath = fs.existsSync(envFilePath);

            if(!existsPath) {
                console.log('.env file doesnt exists');
                process.exit(0);
            }

            this._envConfig = parse(fs.readFileSync(envFilePath));

        } else {

            this._envConfig = {
                PORT: process.env.PORT
            }

        }

    }

    get(key: string): string {
        return this._envConfig[key];
    }

}