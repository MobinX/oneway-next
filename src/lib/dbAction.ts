import { DataAPIClient, VectorDoc, UUID } from '@datastax/astra-db-ts';
import { geminiEmbedding } from './geminiEmbeddingAction';

//interfaces
export interface User {
    _id?: any
    name: string;
    email: string;
    oauth2Id: string;
}

export interface Note extends VectorDoc {
    _id?: any
    title: string
    content: string
    author: string
    updated: Date
    summaryInsights: string[]
    summeryOuetost: string[]
    summeryLearnings: string[]
    summery:string
    type: "video" | "selected-text"| "text"
    url: string 
    groupIds: string[]   
}

export interface GroupNote extends VectorDoc {
    _id?: any
    title: string
    content: string
    author: string
    updated: Date
    summaryInsights: string[]
    summeryOuetost: string[]
    summeryLearnings: string[]
    summery:string
}

export const getClientDB = () => {
    const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;
    const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
    const db = client.db(ASTRA_DB_API_ENDPOINT!);
    console.log(`* Connected to DB ${db.id}`);
    return db
}

export const createUser = async (user: User) => {
    try {
        const db = getClientDB();
        const users = db.collection<User>('users');
        console.log(`* Inserting user ${user.name}...`);
        return await users.insertOne(user);
    } catch (error) {
        console.log(`* Error inserting user ${user.name}: ${error}`);
        return null;
    }
}

export const updateUser = async (id:string, user: User) => {
    try {
        const db = getClientDB();
        const users = db.collection<User>('users');
        console.log(`* Updating user ${id}...`);
        return await users.updateOne({ _id: id }, { $set: user });
    } catch (error) {
        console.log(`* Error updating user ${id}: ${error}`);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const db = getClientDB();
        const users = db.collection<User>('users');
        return await users.findOne({ _id: id });
    } catch (error) {
        console.log(`* Error getting user by id ${id}: ${error}`);
        return null;
    }
}

export const dropUserById = async (id:string) =>{
    try {
        const db = getClientDB();
        const users = db.collection<User>('users');
        return await users.deleteOne({ _id: id });
    } catch (error) {
        console.log(`* Error dropping user by id ${id}: ${error}`);
        return null;
    }
}

export const createNote = async (note: Note) => {
    try {
        const db = getClientDB();
        const notes = db.collection<Note>('notes');
        console.log(`* Inserting note ${note.title}...`);
        return await notes.insertOne({...note, $vector: await geminiEmbedding(note.content)});
    } catch (error) {
        console.log(`* Error inserting note ${note.title}: ${error}`);
        return null;
    }
}

export const updateNote = async (id: string, note: Note) => {
    try {
        const db = getClientDB();
        const notes = db.collection<Note>('notes');
        console.log(`* Updating note ${id}...`);
        return await notes.updateOne({ _id: id }, { $set: { ...note, $vector: await geminiEmbedding(note.content)} });
    } catch (error) {
        console.log(`* Error updating note ${id}: ${error}`);
        return null;
    }
}

export const getNotesByUserId = async (userId: string) => {
    try {
        const db = getClientDB();
        const notes = db.collection<Note>('notes');
        return await notes.find({ author: userId }).toArray();
    } catch (error) {
        console.log(`* Error getting notes for user ${userId}: ${error}`);
        return null;
    }
}

export const getNoteById = async (id: string) => {
    try {
        const db = getClientDB();   
        const notes = db.collection<Note>('notes');
        return await notes.findOne({ _id: id });
    } catch (error) {
        console.log(`* Error getting note by id ${id}: ${error}`);
        return null;
    }
}

export const dropNoteById = async (id: string) => {
    try {
        const db = getClientDB();
        const notes = db.collection<Note>('notes');
        return await notes.deleteOne({ _id: id });
    } catch (error) {
        console.log(`* Error dropping note by id ${id}: ${error}`);
        return null;
    }
}

export const createGroupNote = async (note: GroupNote) => {
    try {
        const db = getClientDB();
        const notes = db.collection<GroupNote>('group_notes');
        console.log(`* Inserting note ${note.title}...`);
        return await notes.insertOne({...note, $vector: await geminiEmbedding(note.content)});
    } catch (error) {
        console.log(`* Error inserting group note ${note.title}: ${error}`);
        return null;
    }
}

export const updateGroupNote = async (id: string, note: GroupNote) => {
    try {
        const db = getClientDB();
        const notes = db.collection<GroupNote>('group_notes');
        console.log(`* Updating group note ${id}...`);
        return await notes.updateOne({ _id: id }, { $set: { ...note, $vector: await geminiEmbedding(note.content)} });
    } catch (error) {
        console.log(`* Error updating group note ${id}: ${error}`);
        return null;
    }
}

export const getGroupNotesByUserId = async (userId: string) => {
    try {
        const db = getClientDB();
        const notes = db.collection<GroupNote>('group_notes');
        return await notes.find({ author: userId }).toArray();
    } catch (error) {
        console.log(`* Error getting group notes for user ${userId}: ${error}`);
        return null;
    }
}

export const getGroupNoteById = async (id: string) => { 
    try {
        const db = getClientDB();
        const notes = db.collection<GroupNote>('group_notes');
        return await notes.findOne({ _id: id });
    } catch (error) {
        console.log(`* Error getting group note by id ${id}: ${error}`);
        return null;
    }
}

export const dropGroupNoteById = async (id: string) => {
    try {
        const db = getClientDB();
        const notes = db.collection<GroupNote>('group_notes');
        return await notes.deleteOne({ _id: id });
    } catch (error) {
        console.log(`* Error dropping group note by id ${id}: ${error}`);
        return null;
    }
}


// curl -X POST http://localhost:3000/api/notes -H 'Content-Type: application/json' -d "{\"title\": \"My Note\", \"content\": \"This is my note\", \"author\": \"mbin\", \"updated\": \"2023-03-01T12:00:00.000Z\", \"summaryInsights\": [\"insight1\", \"insight2\"], \"summeryOuetost\": [\"ouetost1\", \"ouetost2\"], \"summeryLearnings\": [\"learning1\", \"learning2\"], \"summery\": \"This is a summary\", \"type\": \"text\", \"url\": \"https://example.com\", \"groupIds\": [\"group1\", \"group2\"]}"
// curl -G -X GET http://localhost:3000/api/notes -d author=mbin 