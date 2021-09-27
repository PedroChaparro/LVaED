// ------------- FUNCIÓN PARA GRAFICAR UNA CLASE CON EL VISJS -------------

//Graph nodes array
var nodos = new vis.DataSet([


]); 

//Graph vertex array
var aristas = new vis.DataSet([


]); 

//Graph container
var contenedor = document.getElementById("network"); 

//Data needed for Vis to make the Graph
var datos = {

    nodes : nodos,
    edges : aristas

}

//Settings to personalize graph aspect
var opciones = {

    nodes: {
        shape: "dot",       //All nodes will be dots
        borderWidth: 3,     //All nodes will have a border
        
    },

    edges: {

        width: 2,           //Increace edge´s width
        shadow: true,       //Enable edges shadow (also increase width)

    },

}

//Counters to genereta classes, attributes or methods IDs (for VIS)
var IDnode = 0; 
var IDattribute = 0; 
var IDmethod = 0; 

//Current class counter (This is for create the edge from the class node to attribute´s node or method´s node)
var currentClass = 0; 


//Function to add a class to the Graph
function addClass(className){

    currentClass = IDnode+1

    node = { id:(currentClass), label:className, color:{background:"#D987FF", border:"#AE00FF"}};   //Node creation
    nodos.add(node);    //Add created node to the nodes array
    
    //Se aumentan y cambian los contadores
    IDnode++; 
    IDattribute = IDnode; 
    IDmethod = IDnode; 

}

function addAttribute(attributeName){
    
    node = { id:(IDattribute+1), label:attributeName, color:{background:"#87F8FF", border:"#00F0FF"}};  //Node creation
    nodos.add(node);    //Add created node to the nodes array

    //Edge from class´s node to attribute´s node
    arista = {from:currentClass, to:(IDattribute+1), label:"Attribute", color:{color:"#000000"}, length:120}    //Edge creation
    aristas.add(arista);    //Add created edge to the edges array

    //Se aumentan y cambian los contadores
    IDattribute++; 
    IDnode = IDattribute; 
    IDmethod = IDattribute; 

}

function addMethod(methodName){

    node = {id:(IDmethod+1), label:methodName, color:{background:"#C5FFB4", border:"#39FF00"}}  //Node creation
    nodos.add(node);    //Add created node to the nodes array

    //Arista desde el nodo de la clase hasta el nodo del método:
    arista = {from:currentClass, to:(IDmethod+1), label:"Method",color:{color:"#000000"}, length:140}       //Edge creation
    aristas.add(arista);    //Add created edge to the edges array


    //Se aumentan y cambian los contadores
    IDmethod++; 
    IDnode = IDmethod; 
    IDattribute = IDmethod;
    
}

function addArg(argsArray){
    
    for(index in argsArray){

        node = {id:(IDnode+1), label:argsArray[index], color:{background:"#F7FFB4", border:"#E4FF00"}}  //Node creation
        nodos.add(node);    //Add created node to the nodes array

        //Arista desde el nodo de la clase hasta el nodo del método:
        arista = {from:IDmethod, to:(IDnode+1), label:"Arg",color:{color:"#000000"}}       //Edge creation
        aristas.add(arista);    //Add created edge to the edges array

        //Se aumentan y cambian los contadores
        IDnode++; ; 

    }

    IDmethod = IDnode; 
    IDattribute = IDnode;

}


//Function for make the Graph
function makeGraph(GrapData){

    arg_index = 0; 

    console.log(GraphData)

    //Obtein each class
    for(Clase in GrapData){

        addClass(Clase.toString());     //Foreach class, add the class to the graph

        //Obtain class´s attributes
        for(Index_Attribute in GrapData[Clase].Attributes){

            addAttribute((GraphData[Clase].Attributes[Index_Attribute]).toString());    //For each attribute, add it to the graph
        }
        
        //Obtain class´s methods
        for(Index_Method in GrapData[Clase].Methods){

            addMethod((GrapData[Clase].Methods[Index_Method]).toString());              //For each method, add it to the graph
            
            //Obtain method´s args

            addArg(GrapData[Clase].Methods_args[GrapData[Clase].Methods[Index_Method]])


        }


    }

    //When finish all, update the graph
    var graph = new vis.Network(contenedor, datos, opciones); 

}

