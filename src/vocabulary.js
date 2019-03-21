import React from 'react';

import VocabularyService from './vocabulary-service';
import VocabularyRow from './vocabulary-row';
import VocabularyStore from './vocabulary-store';
import VocabularyCreate from './vocabulary-create';

class Vocabulary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { VocabularyStore }
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        VocabularyService.getRecords().then(res => {
            VocabularyStore.updateList(res.data);
            this.setState({ VocabularyStore });
            VocabularyStore.addCallback(this.updateState);
        });
        
    }

    updateState() {
        this.setState({ VocabularyStore });
    }

    render() {
        const list = this.state.VocabularyStore.vocabularies.map((vocabulary, index) => {
            return (
                <VocabularyRow 
                    key={ vocabulary._id }
                    id={ vocabulary._id }
                    index={ index }
                    name={ vocabulary.name } 
                    definition={ vocabulary.definition } 
                    editMode={ this.toggleEdit } />
            );
        });

        return (
            <div>
                <div>Vocabulary component</div>
                <VocabularyCreate />
                {list}
            </div>
        );
    }
}

export default Vocabulary;