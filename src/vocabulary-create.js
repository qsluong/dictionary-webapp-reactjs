import React from 'react';

import VocabularyStore from './vocabulary-store';

class VocabularyCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            name: '',
            definition: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.cancelSubmit = this.cancelSubmit.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    toggleMode() {
        this.setState({ 
            creating: !this.state.creating,
            name: '',
            definition: ''
        });
    }

    cancelSubmit() {
        this.toggleMode();
    }

    saveChanges(e) {
        e.preventDefault();
        let record = {
            name: e.target.name.value,
            definition: e.target.definition.value
        }
        this.setState({ currentValue : record })
        VocabularyStore.addRecord(record);
        this.toggleMode();
    }

    layout() {
        if (this.state.creating) {
            return(
                <form onSubmit={ this.saveChanges }>
                    <div>
                        <label>Name</label>
                        <input 
                            name='name'
                            value={ this.state.name }
                            onChange={ this.handleChange } />
                    </div>
                    <div>
                        <label>Definition</label>
                        <input 
                            name='definition'
                            value={ this.state.definition }
                            onChange={ this.handleChange } />
                    </div>
                    <button type='submit'>Save changes</button>
                    <button onClick={ this.cancelSubmit }>Cancel</button>
                </form>
            );
        } else {
            return(
                <button onClick={ this.toggleMode }>Add new record</button>
            );
        }
    }

    render() {
        return (this.layout());
    }
}

export default VocabularyCreate;