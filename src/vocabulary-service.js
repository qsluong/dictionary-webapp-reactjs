import Axios from 'axios';

let url = 'http://localhost:3000/vocabulary'

class VocabularyService {
    getRecord() {
        return Axios.get(url);
    }

    getRecords() {
        return Axios.get(url + '/all');
    }

    createRecord(record) {
        return Axios.post(url, record);
    }

    updateRecord(id, record) {
        return Axios.put(url + '/' + id, record);
    }

    deleteRecord(id) {
        return Axios.delete(url + '/' + id);
    }
}

export default VocabularyService = new VocabularyService();