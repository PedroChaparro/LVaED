import { NOTFOUND } from "dns";
import { unlink } from "fs";

// --------------------------
// ---- NODO DE LA LISTA ----
// --------------------------

class list_node {

    private data:any; 
    private next_node:list_node|null;

    //Constructor
    constructor(data:any){
        this.data = data;
        this.next_node = null;  
    }

    //Getters y setters
    get get_data():any{
        return this.data; 
    }

    get get_next_node():list_node|null{
        return this.next_node; 
    }

    set set_data(data:any){
        this.data = this.data; 
    }

    set set_next_node(next_node:list_node|null){
        this.next_node = next_node; 
    }

    //Método para imprimir el contenido de los nodos
    toString():void{
        if(this.next_node != null){
            console.log("ListNode: " + " Data: " + this.data + " NextNode -> ");
            this.next_node.toString(); 
        }else{
            console.log("ListNode: " + " Data: " + this.data + " NextNode: NULL");
        }
    }

    //Método para saber si un nodo almacena un objeto
    isEquals(object:any):Boolean{
        if(this.data === object){   //Es importante verificar también el tipo del dato
            return true; 
        }else{
            return false; 
        }
    }

}

// --------------------------
// ---- LISTA ----
// --------------------------

class SimpleLinkedList{

    private size:number; 
    private head:list_node|null; 
    private tail:list_node|null; 

    //Constructor sin pasar el primer dato
    constructor(){
        this.size = 0; 
        this.head = null; 
        this.tail = null; 
    }


    //Getters y setters
    get get_size():number{return this.size}; 
    get get_head():list_node|null{return this.head}; 
    get get_tail():list_node|null{return this.tail}; 

    set set_head(head:list_node){this.head = head}
    set set_tail(tail:list_node){this.tail = tail}

    //Método para saber si la lista está vacía
    isEmpty():boolean{
        return this.head == null; 
    }

    //Método para agregar objetos a la lista, añadiéndolos en la cola
    insert(object:any){
        
        //Se crea el nodo que contrendrá el nuevo objeto
        let new_node:list_node = new list_node(object);
        
        if(this.head == null){
            //Si la cabeza de la lista es nula, significa que no hay objetos en la lista
            this.head! = new_node;      //Se añade el objeto en la cabeza
            this.tail! = this.head!;    //La cola será la misma cabeza, ya que no hay más nodos
        }else{
            this.tail!.set_next_node = new_node;    //Si ya hay datos, se añade el siguiente nodo después de la cola
            this.tail = new_node;   //La nueva cola será el nuevo nodo
        }

        this.size++;                        //Aumentamos el size de la lista tras hacer el insert

    }

    //Método para buscar si un objeto está en la lista
    search(object:any):boolean{
        
        if(this.head != null){

            let current_node:list_node|null = this.head!;

            for(let i=0; i<this.size; i++){

                if(current_node!.get_data === object){
                    console.log('Objeto: ' + object + ' enocntrado en el índice: ' + i); 
                    return true; 

                }

                current_node = current_node!.get_next_node; 

            }

        }else{

            return false;   //Si la lista está vacía, retorna falso

        }

        return false;       //Si no estaba vacía, pero no se encontró el objeto, retorna falso

    }

    //Método para eliminar un objeto de la lista (Remueve el nodo que contiene el objeto)
    remove(object:any):boolean{

        //Primero se verifica si la lista contiene el objeto
        if(this.search(object) == false){
            return false;
        }else{

            //Si la lista sí contiene el objeto, se revisa primero si lo contiene la cabeza
            if(this.head!.isEquals(object)){

                this.head = this.get_head!.get_next_node;   //La cabeza será el siguiente nodo a la anterior cabeza

            }else{

                //Si el objeto no lo contiene la cabeza, es necesario iterar en la lista hasta encontrar el nodo que lo contenga
                let current_node:list_node = this.head!; 

                for(let i=1; i<this.size; i++){

                    if(current_node.get_next_node!.isEquals(object)){

                        //Si el nodo que contiene el objeto es el siguiente nodo a "current_node", se deja de iterar
                        break; 

                    }

                    //Si no se ha encontrado, se sigue iterando
                    current_node = current_node!.get_next_node!; 

                }

                //Cuando se termine de iterar, se hace el cambio 
                current_node.set_next_node = current_node.get_next_node!.get_next_node; 

            }

            return true; 

        }
    

    }

    //Método para saber si la lista contiene un objeto
    contains(object:any):boolean{

        return(this.search(object));    //Se llama al método que se encarga de buscar el objeto

    }

    insertAtHead(object:any){

        if(this.isEmpty() == true){

            //Si la lista está vacía, simplemente se llama al método insert()
            this.insert(object); 

        }else{

            let new_head = new list_node(object); 
            new_head.set_next_node = this.head!;    //El siguiente nodo al nuevo nodo será la anterior cabeza

            this.head = new_head;   //La nueva cabeza será el nuevo nodo

        }

    }

    //Método para insertar un objeto en un índice específico
    insertAt(object:any, index:number){

        if(index == this.size){

            //Si se quiere insertar al final de la lista, se llama al método insert
            this.insert(object); 

        }else if(index == 0){

            //Si se quiere insertar en el índice 0 (la cabeza), se llama al método insertAtHead()
            this.insertAtHead(object); 

        }else{

            //Si no se quiere insertar ni en la cabeza ni en la cola, se itera hasta encontrar la posición
            let current_node:list_node = this.head!; 

            for(let i=1; i<index; i++){

                current_node = current_node.get_next_node!; 

            }

            //Cuando se encuentre la posición, se hacen los cambios
            let new_node:list_node = new list_node(object); 
            new_node.set_next_node = current_node.get_next_node; 
            current_node.set_next_node = new_node; 

        }

    }

    //Método para imprimir toda la lista
    listToString():void{
        this.head!.toString(); 
    }
    
}

const lista = new SimpleLinkedList(); 


lista.insert(1); 
lista.insert(2); 
lista.insert(3); 


lista.listToString(); 


