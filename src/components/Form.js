import React from 'react';


// Try to do this later 

class Form extends React.Component {

    constructor(props){
        super.props();
        this.state = {

        }
    };

    handleChange(id, event){
        const newElements = { ...elements }
        newElements.fields.forEach(field => {
          const { field_type, field_id } = field;
          if (id === field_id) {
            switch (field_type) {
              case 'checkbox':
                field['field_value'] = event.target.checked;
                break;
    
              default:
                field['field_value'] = event.target.value;
                break;
            }
          }
          setElements(newElements)
        });
        console.log(elements)
      }

    render(){
        return(
            <form>
                {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
            </form>
        );
    }
}