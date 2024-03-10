import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    mongoose.set('strictQuery', true);
    const db = mongoose.connect(getUri);
    if(db){
        console.log("Database connected");
        return db;
    }
}

export default connect;