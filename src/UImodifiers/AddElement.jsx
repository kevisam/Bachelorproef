import { data } from "../config";


export function AddElement(component,id,style,onClick,label,socket) {
    console.log(data);
    var string = "{component: " + component + ", " + "id: " + id + ", " + ", " + "styles: " + style + "}";

    var myObj;

    switch(component){
        case "button":

            myObj = {
                "component" : component,
                "id" : id,
                "styles" : style,
                "onClick" : onClick,
                "label" : label,    
                 }
                 break;
        case "select":
            myObj = {
                "component" : component,
                "id" : id,
                "styles" : style,
                "field_options" : [],
                "label" : label
                 }
                 break;
        case "li":
            myObj = {
                "component" : component,
                "id" : id,
                "styles" : style,
                "children" : [],
                "label" : label
                 }
                 break;

        default :
        myObj = {
            "component" : component,
            "id" : id,
            "styles" : style,
            "label" : label
        }
        break;
    }

    console.log(myObj);
    data.content['body'].push(myObj);
};