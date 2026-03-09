from http.server import HTTPServer, SimpleHTTPRequestHandler

HOST = "0.0.0.0"
PORT = 8000

if __name__ == "__main__":
    server = HTTPServer((HOST, PORT), SimpleHTTPRequestHandler)
    print(f"Serving static app at http://{HOST}:{PORT}")
    server.serve_forever()
