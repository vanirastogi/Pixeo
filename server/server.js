import dotenv from 'dotenv';
import app from './app.js';
import connectToDatabase from './db/index.js';

dotenv.config();

connectToDatabase()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    })
    app.get('/', (req, res) => {
        res.send('Server is up and running!');
    });
})
.catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with failure
});
