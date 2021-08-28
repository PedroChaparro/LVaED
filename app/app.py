from flask import Flask, render_template, redirect

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
@app.route('/code_to_diagram')
def code_to_diagram():
    return render_template('code_to_diagram.html')

#Ruta hacia la página de transformaciones diagrama-código
@app.route('/diagram_to_code')
def diagram_to_code():
    return render_template('diagram_to_code.html')

if __name__ == "__main__": 
    app.run(debug=True)
