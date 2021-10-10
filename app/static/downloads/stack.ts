// --------------------------
// ---- NODO DE LA PILA ----
// --------------------------

class stack_node {

    private data:any; 
    private next_node:stack_node|null;

    //Constructor
    constructor(data:any){
        this.data = data;
        this.next_node = null;  
    }

    //Getters y setters
    get get_data():any{
        return this.data; 
    }

    get get_next_node():stack_node|null{
        return this.next_node; 
    }

    set set_data(data:any){
        this.data = this.data; 
    }

    set set_next_node(next_node:stack_node|null){
        this.next_node = next_node; 
    }

    //Método para imprimir el contenido de los nodos
    toString():void{
        if(this.next_node != null){
            console.log("Stack node: " + " Data: " + this.data + " NextNode -> ");
            this.next_node.toString(); 
        }else{
            console.log("Stack node: " + " Data: " + this.data + " NextNode: NULL");
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
// ---- PILA (STACK) ----
// --------------------------

class stack {

    private size:number; 
    private top:stack_node|null; 

    constructor(){  
        this.size = 0; 
        this.top = null; 
    }

    //Getters 
    get get_size():number{ return this.size }; 
    get get_top():stack_node|null{ return this.top}; 

    //Métodos de la pila
    
    //Método para saber si la pila está vacía
    isEmpty():boolean{
        return this.top == null; 
    }

    //Método para ver el elemento del top de la pila, sin sacarlo
    peek():any{
        if(this.isEmpty()){

            //Si la pila está vacía, retorna null   
            return null; 

        }else{

            //Si la pila no está vacía, retorna el objeto almacenado en top
            return this.top!.get_data; 

        }
    }

    push(object:any){
        
        let new_top = new stack_node(object);   //Se crea el nuevo nodo

        if(this.isEmpty()){
            //Si la pila está vacía, crea el nodo y lo asigna como el top de la pila
            this.top = new_top; 
        }else{
            //Si ya hay un top en la pila

            //El top de la pila será el nuevo nodo, y apuntará al anterior top
            new_top.set_next_node = this.top; 
            this.top = new_top; 
        }

        this.size++;    //Al terminar, aumenta el size de la pila

    }

    //Método para sacar de la pila el objeto del top
    pop():any{

        //Primero verifica que la pila no esté vacía
        if(this.isEmpty()){
            //Si está vacía, retorna null
            return null; 
        }else{
            //El retorno será el objeto que guarda el nodo "top"
            let retorno:any = this.top!.get_data; 

            //El top de la pila ahora será el siguiente nodo al nodo que se va a eliminar
            this.top = this.top!.get_next_node; 

            return retorno; 
        }

    }

    //Método para buscar un objeto en la pila
    search(object:any):boolean{

        if(this.isEmpty()){
            //Si la pila está vacía, retorna falso
            return false; 
        }else{

            let retorno = false;    //El retorno empieza siendo falso

            //Si no está vacía, itera entre los nodos de la pila, para buscar el elemento
            let current_node:stack_node|null = this.top; 

            //Mientras que el siguiente nodo no sea nulo, sigue iterando
            while(current_node != null){

                //Si encontró el objeto, rompe el ciclo y cambia el retorno a true
                if(current_node!.get_data === object){
                    retorno = true; 
                    break; 
                }

                //Si no ha encontrado el objeto, sigue iterando
                current_node = current_node!.get_next_node; 

            }

            return retorno; 

        }

    }

    //Método para voltear la pila
    reverse():stack|null{

        if(this.isEmpty()){
            //Si la pila está vacía, retorna null
            return null; 
        }else{
            //Se crea una pila a retornar
            let reversed_stack:stack = new stack(); 

            let current_node:stack_node|null = this.top; 

            while(current_node != null){
                //Se agrega a la pila "reversed_stack" la información de cada nodo de la pila, empezando por el top
                reversed_stack.push(current_node.get_data); 

                current_node = current_node!.get_next_node; 
            }

            //Lo anterior da como resultado la misma pila, pero invertida, ya que el primer elemento en ser insertado, va quedando en el fondo
            return reversed_stack; 

        }

    }

    //Método para mostrar el contenido de la pila
    toString():void{
        if(this.isEmpty()){
            //Si la pila está vacía, escribe 'empty'
            console.log("EMPTY"); 
        }else{
            this.top!.toString(); 
        }
    }

}

const pila = new stack(); 
pila.push(1); 
pila.push(2); 
pila.push(3); 
pila.push(4); 
pila.push(5); 



