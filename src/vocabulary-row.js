import React from 'react';

import VocabularyStore from './vocabulary-store';

class VocabularyRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            id: this.props.id,
            name: this.props.name,
            definition: this.props.definition,
            currentValue: {
                name: this.props.name,
                definition: this.props.definition
            }
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelSubmit = this.cancelSubmit.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    toggleEdit() {
        this.setState({
            editing: !this.state.editing,
            name: this.state.currentValue.name,
            definition: this.state.currentValue.definition
        });
        // Set value to the values last time it was saved (currentValue)
    }

    deleteRecord() {
        VocabularyStore.deleteRecord(this.state.id, this.props.index);
    }

    saveChanges(e) {
        e.preventDefault();
        let record = {
            id: this.state.id,
            name: e.target.name.value,
            definition: e.target.definition.value
        }
        this.setState({ currentValue : record })
        VocabularyStore.editRecord(this.state.id, record);
        this.toggleEdit();
    }

    cancelSubmit() {
        this.toggleEdit();
    }

    layout() {
        if (this.state.editing) {
            return (
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
                    <button type="submit">Save changes</button>
                    <button onClick={ this.cancelSubmit }>Cancel</button>
                    <hr></hr>
                </form>
            );
        } else {
            return (
                <div>
                    <h4>{ this.state.currentValue.name }</h4>
                    <p>{ this.state.currentValue.definition }</p>
                    <button onClick={ this.toggleEdit }>Edit</button>
                    <button onClick={ this.deleteRecord }>Delete</button>
                    <hr></hr>
                </div>
            );
        }
    }

    render() {
        return (this.layout());
    }
}

export default VocabularyRow;