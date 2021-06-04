import { db } from "../firebase/firebase-config"



export const loadNotes =  async ( uid ) =>{

    const dbCollection = db.collection(`${uid}/journal/notes`);
    const notesSnap = await dbCollection.orderBy('date','desc').get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push( {
            id : snapHijo.id,
            ...snapHijo.data()
        } );
    });

    return notes;
}