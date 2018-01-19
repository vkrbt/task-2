(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    var generateVisitedMap = root.SHRI_ISLANDS.generateVisitedMap;
    var getNextUnvisitedNeighbour = root.SHRI_ISLANDS.getNextUnvisitedNeighbour;

    var rowElements;
    var res;

    var interval = 150;
    var islands = 0;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     *
     * @param {number[][]} map
     */
    function visualizeSolution(map) {
        rowElements = document.querySelectorAll('.map__row');
        res = document.querySelector('.map__res');
        res.innerText = 'Count: ' + islands;
        iterate(map, generateVisitedMap(map), 0, 0);
    }


    /**
     *
     * @param {number[][]} map
     * @param {number[][]} visited
     * @param {number} col
     * @param {number} row
     */
    function iterate(map, visited, col, row) {
        markCurrent({ col, row });
        if (map[col][row] === 1 && !visited[col][row]) {
            res.innerText = 'Count: ' + (++islands);
            visitIsland(map, visited, col, row);
        } else {
            setTimeout(function () {
                visited[col][row] = true;
                markVisited({ col, row });
                if (row < map[0].length - 1) {
                    iterate(map, visited, col, row + 1);
                } else if (col < map.length - 1) {
                    iterate(map, visited, col + 1, 0);
                }
            }, interval);
        }

    }

    /**
     *
     * @param {number[][]} map
     * @param {number[][]} visited
     * @param {number} col
     * @param {number} row
     */
    function visitIsland(map, visited, col, row) {
        var cell;
        var prevCell = { col, row };
        var dfsStack = [prevCell];
        visited[col][row] = true;
        var intervaId = setInterval(function () {
            cell = getNextUnvisitedNeighbour(map, visited, dfsStack[dfsStack.length - 1]);
            if (cell !== null) {
                visited[cell.col][cell.row] = true;
                dfsStack.push(cell);
            } else {
                cell = dfsStack.pop();
            }
            markVisited(prevCell);
            markCurrent(cell);
            prevCell = cell;
            if (dfsStack.length === 0) {
                clearInterval(intervaId);
                iterate(map, visited, col, row);
            }
        }, interval);
    }

    /**
     *
     * @param {Object} cell
     * @param {number} cell.col
     * @param {number} cell.row
     */
    function markVisited({ col, row }) {
        rowElements[col].childNodes[row].classList.remove('map__cell_current');
        rowElements[col].childNodes[row].classList.add('map__cell_visited');
    }

    function markCurrent({ col, row }) {
        rowElements[col].childNodes[row].classList.remove('map__cell_visited');
        rowElements[col].childNodes[row].classList.add('map__cell_current');
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
