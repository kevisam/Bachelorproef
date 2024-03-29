import { data } from "../config";


export function AddElement(component,group,id,style,onClick,label) {
    console.log(data);

    var myObj;

    switch(component){
        case "button":

            myObj = {
                "component" : component,
                "group" : group,
                "id" : id,
                "styles" : style,
                "styles_desktop" : style,
                "styles_tablet" : style,
                "styles_smartphone" : style,
                "onClick" : onClick,
                "label" : label,    
                 }
                 break;
        case "select":
            myObj = {
                "component" : component,
                "group" : group,
                "id" : id,
                "styles" : style,
                "field_options" : [],
                "label" : label
                 }
                 break;
        case "li":
            myObj = {
                "component" : component,
                "group" : group,
                "id" : id,
                "styles" : style,
                "children" : [],
                "label" : label
                 }
                 break;
        case "div":
            myObj = {
                "component" : component,
                "group" : group,
                "id" : id,
                "styles" : style,
                "children" : [],
                "label" : label
                 }
                 break;

        default :
        myObj = {
            "component" : component,
            "group" : group,
            "id" : id,
            "styles" : style,
            "label" : label
        }
        break;
    }

    console.log(myObj);
    data.content['body'].push(myObj);
};