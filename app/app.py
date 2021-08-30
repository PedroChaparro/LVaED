from re import sub
from flask import Flask, render_template, redirect, request     #Flask import
import ast                                                      #Abstract Syntax Tree import
import json                                                     #Import Json for send info to JS

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

    #Walk throught the ast 
    for nodo in code_tree.body:

        #If a class appear
        if isinstance(nodo, ast.ClassDef): 

            #Search for the Methods in the class
            for sub_node in nodo.body: 

                if isinstance(sub_node, ast.FunctionDef):
                    
                    temp_class_methods_list.append(sub_node.name); 

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
                'Methods': [i for i in temp_class_methods_list]

            }

            #Clear attributes and methods lists
            temp_class_methods_list.clear()
            temp_class_attributes_list.clear()
    
    return output_dictionary
    

#Ruta hacia la página de transformaciones diagrama-código
@app.route('/diagram_to_code')
def diagram_to_code():
    return render_template('diagram_to_code.html')


if __name__ == "__main__": 
    app.run(debug=True)
