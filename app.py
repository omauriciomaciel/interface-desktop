import eel
import pandas as pd
from io import BytesIO

eel.init('web')

@eel.expose
def upload_file(number, filename, filedata):
    print(f"Number received: {number}")
    print(f"Filename received: {filename}")

    # Salvar o arquivo em disco temporariamente
    with open(filename, 'wb') as f:
        f.write(filedata)

    # Realizar as manipulações no arquivo .xlsx
    # Exemplo: Aqui, apenas lendo o arquivo e adicionando o número em uma coluna
    df = pd.read_excel(filename)
    df['Number'] = int(number)

    # Criar o novo arquivo modificado
    modified_file = BytesIO()
    with pd.ExcelWriter(modified_file, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False)

    # Retornar o conteúdo do novo arquivo
    return modified_file.getvalue()

eel.start('index.html', size=(200, 200), port=1234)
