import socket
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
from urllib.parse import urlparse
import glob

class MyServer(BaseHTTPRequestHandler) :

    
    def _set_headers(self) :
        """ Headers standards pour répondre du JSON 
        """
        self.send_header('Access-Control-Allow-Origin','*')
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


    def sendData(self, data=0, fileName=0) :
        """ Envoi des données à la page web 
        """
        responseDict = {'path':fileName,
                        'data':data}
        self.send_response(200)
        self._set_headers()
        self.wfile.write(bytes(json.dumps(responseDict), "utf-8"))
        

    def do_GET(self) :
        """ Méthode utile pour le GET
        """
        # Parsage de l'url pour récupérer la requête souhaitée
        results = urlparse(self.path)
        # Dossier de travail de l'utilisateur
        path = results.query
        #Listage des fichiers qui se trouve dedans
        pathPRN = path[5:] + '\\*.PRNx'
        print(pathPRN)
        files = glob.glob(pathPRN)
        print(files)
        # Traitement des fichiers des directory
        if len(files) == 0 :
            # Aucun fichier .PRNx dans le dossier
            self.sendData()
        elif len(files) >= 1 :
            file = open(files[0], "r")
            contentFile = file.read()
            # Envoi des données
            self.sendData(data=contentFile, fileName=files[0])



# Programme principal
if __name__ == "__main__" :
    
    # Paramètre du serveur de la base de données
    hostName = "localhost"
    hostPort = 8000

    # Début de la connexion
    myServer = HTTPServer((hostName, hostPort), MyServer)
    print("=> ",time.asctime(), "Server starts - %s:%s" % (hostName, hostPort))

    try:
        myServer.serve_forever()
    except KeyboardInterrupt:
        pass

    myServer.server_close()
    print("-> ",time.asctime(), "Server stops - %s:%s" % (hostName, hostPort))