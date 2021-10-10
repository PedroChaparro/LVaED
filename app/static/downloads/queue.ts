// --------------------------
// ---- NODO DE LA COLA ----
// --------------------------

class queue_node {

    private data:any; 
    private next_node:queue_node|null;

    //Constructor
    constructor(data:any){
        this.data = data;
        this.next_node = null;  
    }

    //Getters y setters
    get get_data():any{
        return this.data; 
    }

    get get_next_node():queue_node|null{
        return this.next_node; 
    }

    set set_data(data:any){
        this.data = this.data; 
    }

    set set_next_node(next_node:queue_node|null){
        this.next_node = next_node; 
    }

    //Método para imprimir el contenido de los nodos
    toString():void{
        if(this.next_node != null){
            console.log("Queue node: " + " Data: " + this.data + " NextNode -> ");
            this.next_node.toString(); 
        }else{
            console.log("Queue node: " + " Data: " + this.data + " NextNode: NULL");
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
// ---- COLA (QUEUE) ----
// --------------------------
class queue {

    private top:queue_node|null;
    private tail:queue_node|null;  
    private size:number; 

    constructor(){
        this.top = null; 
        this.tail = null; 
        this.size = 0; 
    }

    //Getters
    get get_top():queue_node|null{
        return this.top; 
    }

    get get_tail():queue_node|null{
        return this.tail; 
    }

    get get_size():number{
        return this.size; 
    }

    //Métodos de la cola

    //Método para saber si está vacía
    isEmpty():boolean{
        return this.top == null; 
    }

    //Método para insertar un nuevo elemento en la cola
    insert(object:any):void{

        let new_node = new queue_node(object); 

        //Si la cola está vacía, añade el nuevo objeto y lo asigna como el top y tail (ya que no hay más nodos)
        if(this.isEmpty()){
            this.top = new_node; 
            this.tail = this.top; 
        }else{
            //Si ya hay elementos en la cola, pone el nuevo nodo después del último elemento
            this.tail!.set_next_node = new_node; 
            this.tail = new_node;   //El último nodo de la cola ahora será el nodo que se acaba de añadir
        }

        this.size++;    //Al finalizar, se aumenta el tamaño de la cola

    }

    //Método para ver el elemento del top de la cola, sin sacarlo
    peek():any{
        //Si la cola está vacía, retorna null
        if(this.isEmpty()){
            return null; 
        }else{
            //Si no está vacía, retorna el objeto del top
            return this.top!.get_data; 
        }
    }

    //Método para sacar el elemento de top de la pila
    extract():any{
        //Si la cola está vacía, retorna null
        if(this.isEmpty()){
            return null; 
        }else{
            //Si no está vacía, retorna el objeto de top, y asigna top al siguiente nodo
            let return_objetct:any = this.top!.get_data;   
            this.top = this.top!.get_next_node; 
            return return_objetct; 
        }
    }

    //Método para buscar un objeto dentro de la pila
    search(object:any):boolean{
        //Si la cola está vacía, retorna falso
        if(this.isEmpty()){
            return false; 
        }else{
            //Si no está facía, itera entre los nodos hasta encontrar el objeto
            let encontrado = false; 

            let temp_node:queue_node|null = this.top;    //Nodo temporal para iterar la cola

            for(var i=0; i<this.size; i++){

                if(temp_node!.get_data === object){
                    encontrado = true;  //Si encuentra el objeto cambia el retorno a true
                    break;              //Rompe el ciclo
                }

                //Si no ha encontrado el objeto, sigue iterando entre los nodos
                temp_node = temp_node!.get_next_node; 
            }

            //Finalmente retorna la variable "encontrado", si no se encontró seguirá siendo false
            return encontrado;  

        }
    }

    //Método para imprimir la cola
    queue_toString():void{
        this.top!.toString();    //Se llama al método toSting del nodo top
    }

}

const cola:queue = new queue(); 
cola.insert(1); 
cola.insert(2); 
cola.insert(3); 
cola.insert(4); 

cola.queue_toString(); 