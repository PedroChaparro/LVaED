from re import sub
from flask import Flask, render_template, redirect, request     #Flask import
import ast                                                      #Abstract Syntax Tree import
import json

app = Flask(__name__)

#La ruta raíz de la aplicación será la "plantilla index.html"
@app.route('/')
def index():
    return render_template('index.html')

#Ruta hacia la página de teoría
@app.route('/teoria')
def teoria():
    return render_template('teoria.html')

#Ruta hacia la página de implementaciones
@app.route('/implementaciones')
def implementaciones():
    return render_template('implementaciones.html')

#Ruta hacia la página de transformaciones
@app.route('/transformaciones')
def transformaciones():
    return render_template('transformaciones.html')

#Ruta hacia la página de transformaciones diagrama-código
@app.route('/diagram_to_code')
def diagram_to_code():
    return render_template('diagram_to_code.html')

#Ruta hacia una implementación específica
@app.route('/implementaciones/<concrete_implementation>')
def concrete_implementation(concrete_implementation):

    implementation_lang = concrete_implementation.split(' ')
    implementation = implementation_lang[0]
    lang = implementation_lang[1]
    
    return render_template(get_implementation_route(implementation, lang))

#Ruta hacia la página de transformaciones código-digrama
@app.route('/code_to_diagram',  methods = ['GET', 'POST'])
def code_to_diagram():
    
    outputDictionary = {}

    #Recieve python code File
    if request.method == 'POST':

        python_file = request.files['archivoPython']

        code = python_file.read()

        #Convert recieved python file to Python Abstract Syntax Tree
        tree = ast.parse(code)
        outputDictionary = extractGraphInfo(tree)

    return render_template('code_to_diagram.html', PythonDic = outputDictionary)


#-------- MÉTODO PARA ANALIZAR EL AST DE PYTHON ---------
def extractGraphInfo(code_tree): 

    output_dictionary = {

    }

    temp_class_attributes_list = []
    temp_class_methods_list = []
    temp_class_imports_list = []

    temp_method_args_list = []
    temp_methods_args_dict = {}


    #Walk throught the ast 
    for nodo in code_tree.body:

        #If a class appear
        if isinstance(nodo, ast.ClassDef): 

            #Search for the Methods in the class
            for sub_node in nodo.body: 

                if isinstance(sub_node, ast.FunctionDef):
                    
                    temp_class_methods_list.append(sub_node.name); 

                    #Obtain method args
                    for a in sub_node.args.args:
                        temp_method_args_list.append(a.arg)
                    
                    temp_methods_args_dict[sub_node.name] = temp_method_args_list.copy()
                    temp_method_args_list.clear()

                    #In the __init__ method, search for the class attributes
                    if(sub_node.name == '__init__'): 

                        fuction_comps = ast.walk(sub_node)

                        for possibleAttribute in fuction_comps: 

                            if isinstance(possibleAttribute, ast.Attribute): 
                                
                                temp_class_attributes_list.append(possibleAttribute.attr)
                            
                            else: 

                                pass
            

            output_dictionary[nodo.name] = {

                'Attributes' : [i for i in temp_class_attributes_list], 
                'Methods': [i for i in temp_class_methods_list],
                'Methods_args': temp_methods_args_dict.copy()

            }

            #Clear attributes and methods lists
            temp_class_methods_list.clear()
            temp_class_attributes_list.clear()
            temp_methods_args_dict.clear()
    
    return output_dictionary

#------------------------------------------------------------------------------------
# FUNCIÓN PARA CARGAR LAS RUTAS DE LAS IMPLEMENTACIONES EN EL ARCHIVO DE CONFIGURACIÓN
#------------------------------------------------------------------------------------

def load_implementations():
    #Diccionario que guardará las diferentes implementaciones
    app.config['implementations'] = {}

    app.config['implementations']['cpp'] = {
        #/templates/implementations/c++/
        'simple_linked_list':'implementations/c++/listaSimple.html'
    }

    app.config['implementations']['python'] = {
        #/templates/implementations/python/
        'simple_linked_list':'implementations/python/listaSimple.html',
        'simple_circular_linked_list':'implementations/python/listaSimpleCircular.html',
        'double_linked_list':'implementations/python/listaDoble.html',
        'double_circular_linked_list':'implementations/python/listaDobleCircular.html',
        'queue':'implementations/python/queue.html',
        'stack':'implementations/python/stack.html'
    }

    app.config['implementations']['java'] = {
        #/templates/implementations/java/
    }

#------------------------------------------------------------------------------------
# Función para obtener la ruta de una implementación específica 
#------------------------------------------------------------------------------------

def get_implementation_route(concrete_implementation, lang):

    return app.config['implementations'][lang][concrete_implementation]

#Se llama al método para que se carguen las implementaciones
load_implementations()

if __name__ == "__main__": 
    app.run(debug=True)