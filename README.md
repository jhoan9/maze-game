# maze-game
Este proyecto implementa un juego de laberinto interactivo desarrollado con HTML, CSS y JavaScript. El juego genera laberintos aleatorios, permite al jugador navegar a través de ellos y muestra las rutas óptimas para llegar a la meta.

### Juego de Laberinto - Documentación Técnica

## Descripción General

Este proyecto implementa un juego de laberinto interactivo desarrollado con HTML, CSS y JavaScript. El juego genera laberintos aleatorios, permite al jugador navegar a través de ellos y muestra las rutas óptimas para llegar a la meta.





## Algoritmos y Estructuras de Datos Implementadas

### 1. Generación de Laberintos: Algoritmo Recursive Backtracker (DFS)

**Ubicación en el código**: `scripts/services/MazeGenerator.js`

El algoritmo de generación de laberintos utiliza una búsqueda en profundidad (DFS) con backtracking, también conocido como "Recursive Backtracker":

#### Funcionamiento del algoritmo:

1. **Inicialización**:

1. Se crea una cuadrícula donde cada celda tiene cuatro paredes (arriba, derecha, abajo, izquierda)
2. Se elige una celda inicial (generalmente en la posición 0,0)
3. Se marca la celda inicial como visitada y se añade a una pila



2. **Proceso iterativo**:

1. Mientras la pila no esté vacía:

1. Se toma la celda actual (tope de la pila)
2. Se buscan vecinos no visitados de la celda actual
3. Si hay vecinos no visitados:

1. Se selecciona uno aleatoriamente
2. Se elimina la pared entre la celda actual y el vecino seleccionado
3. Se marca el vecino como visitado
4. Se añade el vecino a la pila (se convierte en la nueva celda actual)



4. Si no hay vecinos no visitados:

1. Se retrocede (backtracking) sacando la celda de la pila









3. **Finalización**:

1. El algoritmo termina cuando todas las celdas han sido visitadas (pila vacía)
2. Para añadir variedad, se eliminan algunas paredes adicionales aleatoriamente





#### Complejidad:

- **Tiempo**: O(N), donde N es el número de celdas
- **Espacio**: O(N) para la pila de backtracking


### 2. Búsqueda de Caminos: Algoritmo Breadth-First Search (BFS)

**Ubicación en el código**: `scripts/utils/PathFinder.js`

Para encontrar las rutas óptimas desde el inicio hasta la meta, se utiliza el algoritmo de búsqueda en anchura (BFS):

#### Funcionamiento del algoritmo:

1. **Construcción del grafo**:

1. Se crea un grafo no dirigido donde cada nodo es una celda del laberinto
2. Las aristas conectan celdas adyacentes que no tienen paredes entre ellas



2. **Búsqueda BFS**:

1. Se inicia desde la celda de origen (0,0)
2. Se utiliza una cola para explorar el grafo por niveles
3. Para cada nodo, se exploran todos sus vecinos accesibles
4. Se mantiene un registro de nodos visitados para evitar ciclos
5. Se guarda el camino recorrido para cada nodo



3. **Reconstrucción del camino**:

1. Cuando se encuentra la celda destino, se reconstruye el camino desde el origen
2. El camino resultante es la ruta más corta (en términos de número de pasos)



4. **Múltiples caminos**:

1. Para encontrar caminos alternativos, se eliminan las celdas del primer camino del grafo
2. Se repite el proceso BFS para encontrar nuevas rutas





#### Complejidad:

- **Tiempo**: O(V + E), donde V es el número de vértices (celdas) y E es el número de aristas (conexiones entre celdas)
- **Espacio**: O(V) para la cola y el conjunto de nodos visitados


### 3. Estructura de Datos: Grafo de Adyacencia

**Ubicación en el código**: `scripts/utils/PathFinder.js` (método `buildGraph()`)

El laberinto se representa internamente como un grafo de adyacencia:

#### Implementación:

1. **Representación**:

1. Cada celda del laberinto es un nodo del grafo
2. Las celdas se identifican por sus coordenadas (x,y) convertidas a string: "x,y"
3. Las conexiones entre celdas (ausencia de paredes) son las aristas del grafo



2. **Estructura**:

1. Se utiliza un objeto JavaScript donde:

1. Las claves son las coordenadas de las celdas ("x,y")
2. Los valores son arrays con las coordenadas de las celdas vecinas accesibles






3. **Construcción**:

```javascript
buildGraph() {
  const graph = {};
  for (let y = 0; y < this.rows; y++) {
    for (let x = 0; x < this.cols; x++) {
      const node = `${x},${y}`;
      graph[node] = this.getNeighbors(x, y);
    }
  }
  return graph;
}
```


4. **Obtención de vecinos**:

```javascript
getNeighbors(x, y) {
  const neighbors = [];
  const cell = this.grid[y][x];
  
  if (!cell.walls.top && y > 0) neighbors.push(`${x},${y-1}`);
  if (!cell.walls.right && x < this.cols-1) neighbors.push(`${x+1},${y}`);
  if (!cell.walls.bottom && y < this.rows-1) neighbors.push(`${x},${y+1}`);
  if (!cell.walls.left && x > 0) neighbors.push(`${x-1},${y}`);
  
  return neighbors;
}
```




## Componentes Principales y sus Algoritmos

### 1. Generador de Laberintos (`MazeGenerator.js`)

- **Algoritmo**: Recursive Backtracker (DFS)
- **Funcionalidad**: Genera laberintos aleatorios eliminando paredes entre celdas
- **Métodos clave**:

- `initGrid()`: Inicializa la matriz de celdas
- `generateStep()`: Ejecuta un paso del algoritmo DFS
- `getUnvisitedNeighbors()`: Encuentra vecinos no visitados de una celda
- `removeWall()`: Elimina la pared entre dos celdas
- `removeRandomWalls()`: Elimina paredes adicionales para crear más caminos





### 2. Buscador de Caminos (`PathFinder.js`)

- **Algoritmo**: Breadth-First Search (BFS)
- **Estructura de datos**: Grafo de adyacencia
- **Funcionalidad**: Encuentra múltiples rutas óptimas desde el inicio hasta la meta
- **Métodos clave**:

- `buildGraph()`: Construye el grafo de adyacencia
- `findPath()`: Implementa el algoritmo BFS para encontrar un camino
- `findDistinctPaths()`: Encuentra múltiples caminos distintos
- `removePathFromGraph()`: Elimina un camino del grafo para encontrar rutas alternativas





### 3. Controlador del Jugador (`PlayerController.js`)

- **Algoritmo**: Detección de colisiones basada en la estructura del laberinto
- **Funcionalidad**: Gestiona el movimiento del jugador y detecta la victoria
- **Métodos clave**:

- `movePlayer()`: Mueve al jugador verificando las paredes
- `checkVictory()`: Verifica si el jugador ha llegado a la meta





### 4. Controlador del Laberinto (`MazeController.js`)

- **Funcionalidad**: Coordina la generación y visualización del laberinto
- **Métodos clave**:

- `generateNewMaze()`: Inicia la generación de un nuevo laberinto
- `drawMaze()`: Dibuja el laberinto en el canvas
- `drawPaths()`: Visualiza las rutas encontradas





## Diagrama Conceptual de los Algoritmos

### Generación del Laberinto (DFS)

```plaintext
Inicio
  |
  v
Crear matriz de celdas con todas las paredes
  |
  v
Elegir celda inicial (0,0)
  |
  v
Marcar como visitada y añadir a la pila
  |
  v
Mientras la pila no esté vacía:
  |
  +----> Tomar celda actual (tope de la pila)
  |      |
  |      v
  |      ¿Tiene vecinos no visitados?
  |      |
  |      +---Sí---> Elegir vecino aleatorio
  |      |          |
  |      |          v
  |      |          Eliminar pared entre celdas
  |      |          |
  |      |          v
  |      |          Marcar vecino como visitado
  |      |          |
  |      |          v
  |      |          Añadir vecino a la pila
  |      |
  |      +---No---> Retroceder (sacar de la pila)
  |
  v
Eliminar algunas paredes adicionales
  |
  v
Fin
```

### Búsqueda de Caminos (BFS)

```plaintext
Inicio
  |
  v
Construir grafo de adyacencia
  |
  v
Iniciar cola con nodo origen
  |
  v
Mientras la cola no esté vacía:
  |
  +----> Sacar primer nodo de la cola
  |      |
  |      v
  |      ¿Es el nodo destino?
  |      |
  |      +---Sí---> Reconstruir y devolver camino
  |      |
  |      +---No---> Para cada vecino accesible:
  |                 |
  |                 +----> ¿Ya fue visitado?
  |                        |
  |                        +---No---> Marcar como visitado
  |                        |          |
  |                        |          v
  |                        |          Añadir a la cola
  |                        |
  |                        +---Sí---> Continuar con siguiente vecino
  |
  v
Para encontrar caminos alternativos:
  |
  +----> Eliminar primer camino del grafo
  |      |
  |      v
  |      Repetir BFS
  |
  v
Fin
```

## Estructura del Proyecto

```plaintext
maze-game/
├── index.html                # Archivo HTML principal
├── assets/
│   └── sounds/               # Efectos de sonido
├── styles/                   # Archivos CSS organizados por componentes
└── scripts/
    ├── main.js               # Punto de entrada de la aplicación
    ├── models/               # Modelos de datos
    │   ├── Cell.js           # Clase para las celdas del laberinto
    │   └── Player.js         # Clase para el jugador
    ├── utils/
    │   └── PathFinder.js     # Algoritmo BFS para búsqueda de caminos
    ├── controllers/          # Controladores
    │   ├── MazeController.js # Control del laberinto
    │   ├── PlayerController.js # Control del jugador
    │   └── UIController.js   # Control de la interfaz
    └── services/
        ├── MazeGenerator.js  # Algoritmo DFS para generación de laberintos
        └── AudioService.js   # Gestión de audio
```

## Tecnologías Utilizadas

- **HTML5**: Estructura de la página y elementos del juego
- **CSS3**: Estilos y diseño responsivo
- **JavaScript (ES6+)**: Lógica del juego y algoritmos
- **Canvas API**: Renderizado del laberinto y el jugador
- **ES6 Modules**: Organización modular del código


## Instalación y Uso

1. Clona este repositorio:

```plaintext
git clone https://github.com/tu-usuario/maze-game.git
```


2. Abre el archivo `index.html` en tu navegador web

O


3. Usa un servidor local para ejecutar el proyecto:

```plaintext
npx serve
```




## Posibles Mejoras Futuras

- Implementar algoritmos alternativos de generación de laberintos (Kruskal, Prim, etc.)
- Añadir heurísticas al algoritmo de búsqueda (A* en lugar de BFS)
- Crear laberintos con diferentes topologías (hexagonal, triangular)
- Implementar laberintos con múltiples niveles o en 3D
- Añadir obstáculos dinámicos y enemigos con algoritmos de pathfinding