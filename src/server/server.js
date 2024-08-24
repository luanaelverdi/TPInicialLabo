const path = require('path');
const express = require('express');
const app = express();

export default class {
    constructor () {
        this.app = express();
        this.app.set("port", process.env.PORT || 4000);
        this.app.use('/public', express.static(path.join(__dirname + '/../public/')));
        this.app.use(express.json());
        this.routes();
        this.app.listen(app.get("port"), () => {
            console.log("✅ | Server listening...");
        });
    }

    routes () {
        try {
            const files = fs.readdirSync(path.join(__dirname + '/routes/'));
            
            for (const file of files) {
                require(path.join(__dirname + '/routes/' + file))(this);
                console.log('✅ | Loaded:', file);
            }

            this.app.get('/', (_, res) => {
                res.sendFile(path.join(__dirname + '/../public/index.html'));
            });
        } catch (error) {
            console.error(error)
        }
    }
}