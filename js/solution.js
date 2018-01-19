(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        var col;
        var row;
        var cols = map.length;
        var rows = map[0].length;
        var visited = generateVisitedMap(map);
        var islands = 0;
        for (col = 0; col < cols; ++col) {
            for (row = 0; row < rows; ++row) {
                if (map[col][row] === 1 && !visited[col][row]) {
                    visitIsland(map, visited, col, row);
                    ++islands;
                }
            }
        }
        return islands;
    }

    /**
     *
     * @param {number[][]} map
     * @returns {number[][]}
     */
    function generateVisitedMap(map) {
        return map.map(function (col) {
            return col.map(function (row) {
                return false;
            })
        });
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
        var dfsStack = [{ col, row }];
        visited[col][row] = true;
        while (dfsStack.length > 0) {
            cell = getNextUnvisitedNeighbour(map, visited, dfsStack[dfsStack.length - 1]);
            if (cell !== null) {
                visited[cell.col][cell.row] = true;
                dfsStack.push(cell);
            } else {
                cell = dfsStack.pop();
            }
        }
    }

    /**
     *
     * @param {number[][]} map
     * @param {number[][]} visited
     * @param {Object} current
     * @param {number} current.col
     * @param {number} current.row
     */
    function getNextUnvisitedNeighbour(map, visited, current) {
        var { col, row } = current;
        if ((map[col + 1] && map[col + 1][row]) && (visited[col + 1] && !visited[col + 1][row])) {
            return { col: col + 1, row }
        }
        if ((map[col - 1] && map[col - 1][row]) && (visited[col - 1] && !visited[col - 1][row])) {
            return { col: col - 1, row }
        }
        if (map[col][row + 1] && !visited[col][row + 1]) {
            return { col, row: row + 1 }
        }
        if (map[col][row - 1] && !visited[col][row - 1]) {
            return { col, row: row - 1 }
        }
        return null;
    }

    root.SHRI_ISLANDS.solution = solution;

    root.SHRI_ISLANDS.generateVisitedMap = generateVisitedMap;
    root.SHRI_ISLANDS.getNextUnvisitedNeighbour = getNextUnvisitedNeighbour;
})(this);
