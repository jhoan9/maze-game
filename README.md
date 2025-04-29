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

### Búsqueda de Caminos (DFS)

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
├── styles/                   # Archivos CSS organizados por componentes
└── scripts/
    ├── main.js               # Punto de entrada de la aplicación
    ├── models/               # Modelos de datos
    │   ├── Cell.js           # Clase para las celdas del laberinto
    │   └── Player.js         # Clase para el jugador
    ├── utils/
    │   └── PathFinder.js     # Algoritmo DFS para búsqueda de caminos
    ├── controllers/          # Controladores
    │   ├── MazeController.js # Control del laberinto
    │   ├── PlayerController.js # Control del jugador
    │   └── UIController.js   # Control de la interfaz
    └── services/
        └── MazeGenerator.js  # Algoritmo DFS para generación de laberintos
```

## Tecnologías Utilizadas

- **HTML5**: Estructura de la página y elementos del juego
- **CSS3**: Estilos y diseño responsivo
- **JavaScript (ES6+)**: Lógica del juego y algoritmos
- **Canvas API**: Renderizado del laberinto y el jugador
- **ES6 Modules**: Organización modular del código


# Algoritmos

### BackTracking - DFS(Deep-First-Search) --> Algoritmo de Busqueda en profundidad



# Referencias

## Proyectos de Generación de Laberintos y Búsqueda de Rutas con JavaScript

## 1. [MazeSolver](https://github.com/NMPoole/MazeSolver)

Este proyecto permite experimentar con diferentes algoritmos de búsqueda de caminos mediante la visualización y animación de cómo distintos algoritmos buscan una ruta hacia un objetivo en una cuadrícula.

### Características principales:

- **Algoritmos de búsqueda implementados**:
  - Búsqueda aleatoria
  - Búsqueda en anchura (BFS)
  - Búsqueda en profundidad (DFS)
  - Algoritmo de Dijkstra
  - A* (A estrella)
  - Búsqueda codiciosa (Greedy Best-First Search)
  - Búsqueda bidireccional codiciosa

- **Algoritmos de generación de laberintos**:
  - Generación aleatoria
  - Generación horizontal
  - Generación vertical
  - Generación por división recursiva

- **Interfaz de usuario**: Desarrollada con React.js para una experiencia interactiva.

- **Demostración en vivo**: [Demo en vivo](https://NMPoole.github.io/MazeSolver/)

## 2. [Pathfinding.js](https://qiao.github.io/PathFinding.js/visual/)

Pathfinding.js es una biblioteca que permite crear laberintos y visualizar cómo diferentes algoritmos de búsqueda los resuelven.

### Características principales:

- **Interactividad**: Los usuarios pueden dibujar obstáculos en la cuadrícula y establecer puntos de inicio y fin.

- **Algoritmos de búsqueda disponibles**:
  - A*
  - IDA*
  - Dijkstra
  - BFS
  - DFS

- **Opciones avanzadas**: Soporta pesos en las celdas, búsqueda bidireccional y restricciones en los movimientos.

- **Visualización**: Animaciones claras que muestran el proceso de búsqueda en tiempo real.

## 3. [Generación de Laberintos Aleatorios con JavaScript](https://cloudfour.com/thinks/generating-random-mazes-with-javascript/)

Este artículo describe cómo generar laberintos aleatorios utilizando JavaScript y la API de Canvas.

### Enfoque:

- **Restricciones definidas**:
  - Laberintos rectangulares.
  - Un solo camino desde el borde izquierdo al derecho.
  - Es posible visitar cada casilla del laberinto.

- **Implementación**: Utiliza un enfoque basado en la creación de una tabla HTML y la manipulación de celdas para representar las paredes y caminos.

- **Demostración interactiva**: Incluye un enlace a un CodePen donde se puede visualizar la generación de laberintos en tiempo real.

## 4. [Generador de Laberintos con DFS en JavaScript](https://dstromberg.com/2013/07/tutorial-random-maze-generation-algorithm-in-javascript/)

Este tutorial explica cómo implementar un generador de laberintos utilizando el algoritmo de búsqueda en profundidad (DFS) con retroceso recursivo.

### Detalles técnicos:

- **Representación**: Utiliza una matriz bidimensional donde cada celda tiene cuatro bordes que representan las paredes.

- **Algoritmo**: El DFS recursivo elimina paredes entre celdas adyacentes para crear un camino desde el punto de inicio hasta el final.

- **Características**:
  - Cada laberinto generado es único y tiene una solución garantizada.
  - La implementación es sencilla y adecuada para principiantes.

## 5. [Generador de Laberintos con Algoritmos de Generación](https://joeiddon.github.io/projects/javascript/maze_generation.html)

Este proyecto presenta una implementación de varios algoritmos de generación de laberintos en JavaScript.

### Algoritmos implementados:

- **Backtracker**: Utiliza DFS con retroceso recursivo para generar laberintos.

- **Prim's Algorithm**: Un algoritmo basado en la expansión de árboles mínimos.

- **Sidewinder**: Un algoritmo que crea laberintos con pasajes horizontales.

- **Eller's Algorithm**: Un algoritmo que genera laberintos sin ciclos.

- **Generación en 3D**: También se exploran técnicas para generar laberintos en tres dimensiones.

- **Demostración en vivo**: Permite visualizar la generación de laberintos utilizando diferentes algoritmos.

## 6. [Generador de Laberintos en GitHub](https://github.com/codebox/mazes)

Este repositorio de GitHub ofrece un generador de laberintos en JavaScript con soporte para diferentes tipos de cuadrículas.

### Características:

- **Tipos de cuadrículas**:
  - Cuadrada
  - Triangular
  - Hexagonal
  - Circular

- **Algoritmos de generación**:
  - DFS
  - BFS
  - Prim's
  - Eller’s
  - Sidewinder

- **Visualización**: Incluye una interfaz para navegar por el laberinto generado y ver la solución óptima.

## 7. [Generador de Laberintos con DFS en YouTube](https://www.youtube.com/watch?v=nHjqkLV_Tp0)

Este video tutorial muestra cómo crear un generador de laberintos utilizando el algoritmo DFS en JavaScript.

### Contenido del video:

- **Explicación paso a paso**: Detalla cómo implementar el algoritmo DFS para generar laberintos.

- **Demostración práctica**: Muestra la creación de un laberinto en tiempo real y su visualización.

- **Recomendado para**: Desarrolladores que deseen comprender la implementación del algoritmo DFS en la generación de laberintos.

## 8. [Generador de Laberintos en YouTube](https://www.youtube.com/watch?v=EN733Aq4ynM)

Este video presenta un generador de laberintos utilizando HTML, CSS y JavaScript.

### Características:

- **Interactividad**: Permite al usuario generar laberintos y navegar a través de ellos.

- **Implementación**: Utiliza técnicas de manipulación del DOM y eventos para crear la experiencia interactiva.

- **Enfoque educativo**: Ideal para aprender sobre la integración de tecnologías web en proyectos interactivos.

## Conclusión

Estos proyectos ofrecen una variedad de enfoques y técnicas para la generación de laberintos y la búsqueda de rutas en JavaScript. Desde implementaciones simples hasta soluciones más complejas con interfaces interactivas, cada uno proporciona una perspectiva única sobre cómo abordar estos problemas. Explorar estos recursos puede ser útil para desarrolladores interesados en algoritmos, juegos o visualizaciones interactivas.



## Instalación y Uso

1. Clona este repositorio:

```plaintext
git clone https://github.com/jhoan9/maze-game
```


2. Abre el archivo `index.html` en tu navegador web

O


3. Usa un servidor local para ejecutar el proyecto:

```plaintext
npx serve
```
