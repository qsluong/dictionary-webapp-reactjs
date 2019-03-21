import VocabularyService from './vocabulary-service';
import Vocabulary from './vocabulary';

// According to flux architecture this is a dispatcher/store
let VocabularyStore = {
    vocabularies: [],
    callbacks: [],
    updateList(records) {
        let list = [];
        for (var i = 0; i < records.length; i++) {
            list.push(records[i]);
        }
        this.vocabularies = list;
    },
    addRecord(record) {
        console.log(record);
        VocabularyService.createRecord(record).then(response => {
            console.log(response)
            this.vocabularies.push(response.data);
            this.callBack();
        });
    },
    editRecord(id, record) {
        console.log(record);
        VocabularyService.updateRecord(id, record).then(res => {
            console.log(res.data);
            this.callBack();
        });
    },
    deleteRecord(id, index) {
        console.log(id);
        console.log(index);
        VocabularyService.deleteRecord(id).then(res => {
            console.log(res);
            this.vocabularies.splice(index, 1);
            this.callBack();
        });
    },
    addCallback(fun) {
        this.callbacks.push(fun);
        console.log(fun)
    },
    callBack() {
        this.callbacks.forEach(c => {
            c();
        });
    }
}

export default VocabularyStore; 