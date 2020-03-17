import * as $ from 'jquery';

export class GameBoard
{
    /* Board properties */


    constructor(size)
    {
        this.minSize = 4;
        this.maxSize = 12;
        this.board = null;

        this.setSize(size);
        this.sizeInPixel = this.size * 50;

        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
        var numbers = ['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

        this.columns = [];
        for (var i = 0; i < this.size; i++)
        {
            this.columns.push(alphabet[i]);
        }

        this.rows = [];
        var indexRows = 0;
        for (var i = numbers.length - this.size; i < numbers.length; i++)
        {
          this.rows.push(numbers[i]);
        }

        this.squarePerOddLines = ( this.size ) / 2;
        this.squarePerEvenLines = this.squarePerOddLines - 1;

        // Décalé car la première ligne de losange est vide
        this.diamondsPerOddLines = this.squarePerOddLines;
        this.diamondsPerEvenLines = this.squarePerEvenLines;
    }

    setSize(size)
    {
        if (size % 2 !== 0)
        {
            size = size + 1;
        }

        if (size >= this.minSize && size <= this.maxSize)
        {
            this.size = size;
        }
        else if (size > this.maxSize)
        {
            this.size = this.maxSize;
        }
        else
        {
            this.size = this.minSize;
        }
    }

    generateBoardGame()
    {
        // BoardContainer
        var boardContainer = $("#boardContainer");

        // Board
        var board = "<div class=\"board\" id=\"boardGame\"></div>";
        boardContainer.append(board);
        this.board = $("#boardGame");    // Getting jQuery object

        this.board.css("width", this.sizeInPixel + "px");
        this.board.css("height", this.sizeInPixel + "px");

        // Vertical coordinates
        var verticalCoordBar = this.generateCoordBar(this.rows, false);
        boardContainer.prepend(verticalCoordBar);
        boardContainer.append(verticalCoordBar);

        // coord top
        var horizontalCoordBar = this.generateCoordBar(this.columns, true);

        // BoardLayers
        var layers = this.generateBoardGameLayers();

        this.board.append(horizontalCoordBar);
        this.board.append(layers);
        this.board.append(horizontalCoordBar);
    }

    generateCoordBar(bar, isHorizontal)
    {
        var className = "";
        var height = this.sizeInPixel;
        var width = "30";
        var startCoordinate = this.rows.length - this.size;

        if (isHorizontal === true)
        {
            className = "horizontal";
            height = "30";
            width = this.sizeInPixel;
            startCoordinate = 0;
        }

        var coordBar = "<div class=\"board-coord-bar " + className + "\" style=\"height: " + height + "px; width: " + width + "px;\">";


        for (var coordinate = startCoordinate; coordinate < this.size; coordinate++)
        {
            coordBar += "<div class=\"board-coord\">" + bar[coordinate] + "</div>";
        }

        coordBar += "</div>";

        return coordBar;
    }

    generateBoardGameLayers()
    {
        var layers = this.generateBoardGameColumnsLayer();
        layers += this.generateBoardGameRowLayer();
        layers += this.generateBoardGameDiamondsCenterLayer();
        layers += this.generateBoardGameSquareCenterLayer();
        layers += this.generateBoardGameSquareColorLayer();
        layers += this.generateBoardGameStoneLayer();

        return layers;
    }

    generateBoardGameColumnsLayer()
    {
        var columnsLayer = "<div class=\"board-layer\">";

        for (var i = 0; i < this.size; i++)
        {
            columnsLayer += '<div class="board-column">';
            for (var j = 0; j < this.size - 1; j++)
            {
                columnsLayer += '<div class="board-verticalLine"></div>';
            }
            columnsLayer += '</div>';
        }

        columnsLayer += '</div>';

        return columnsLayer;
    }

    generateBoardGameRowLayer()
    {
        var rowsLayer = "<div class=\"board-layer fldc\">";

        for (var i = 0; i < this.size; i++)
        {
            rowsLayer += '<div class="board-row">';

            for (var j = 0; j < this.size - 1; j++)
            {
                rowsLayer += '<div class="board-horizonalLine"></div>';
            }

            rowsLayer += '</div>';
        }

        rowsLayer += '</div>';

        return rowsLayer;
    }

    generateBoardGameDiamondsCenterLayer()
    {
        var diamondsCenterLayer = "<div class=\"board-layer fldc\">";

        for (var i = 0; i < this.size; i++)
        {
            if (i === 0)
            {
                diamondsCenterLayer += "<div class=\"board-diamondCenter-row first\"></div>";
            }
            else
            {
                diamondsCenterLayer += "<div class=\"board-diamondCenter-row\">";

                let nbDiamonds = 0;
                if (i % 2 === 0)
                {
                    nbDiamonds = this.diamondsPerEvenLines;
                }
                else
                {
                    nbDiamonds = this.diamondsPerOddLines;
                }

                for (var j = 0; j < nbDiamonds; j++)
                {
                    diamondsCenterLayer += "<div class=\"board-diamondCenter-line\"></div>";
                }
                diamondsCenterLayer += "</div>";
            }
        }

        diamondsCenterLayer += "</div>";

        return diamondsCenterLayer;
    }

    generateBoardGameSquareCenterLayer()
    {
        var squareCenterLayer = '<div class="board-layer fldc">';

        for (var i = 0; i < this.size - 1; i++)
        {
            squareCenterLayer += '<div class="board-squareCenter-row">';

            let nbCarres = 0;
            if (i % 2 === 0)
            {
                nbCarres = this.squarePerEvenLines;
            }
            else
            {
                nbCarres = this.squarePerOddLines;
            }

            for (var j = 0; j < nbCarres; j++)
            {
                squareCenterLayer += '<div class="board-squareCenter-line"></div>';
                squareCenterLayer += '<div class="board-squareCenter-line"></div>';
            }
            squareCenterLayer += '</div>';
        }

        squareCenterLayer += '</div>';

        return squareCenterLayer;
    }

    generateBoardGameSquareColorLayer()
    {
        let squareColorLayer = '<div class="board-layer fldc color">';

        for (var i = 0; i < this.size - 1; i++)
        {
            squareColorLayer += '<div class="board-squareColor-row">';

            let nbCarres = 0;
            if (i % 2 === 0)
            {
                nbCarres = this.squarePerEvenLines;
            }
            else
            {
                nbCarres = this.squarePerOddLines;
            }

            for (var j = 0; j < nbCarres; j++)
            {
                squareColorLayer += '<div class="board-squareColor-square"></div>';
            }

            squareColorLayer += '</div>';
        }

        squareColorLayer += '</div>';

        return squareColorLayer;
    }

    generateBoardGameStoneLayer()
    {
        let htmlStoneLayer = '<div class="board-layer fldc stone">';

        let indexRows = 0;
        let indexColumns = 0;
        for (let i = 0; i < this.squarePerOddLines; i++)
        {
            // Ligne sans offset
            htmlStoneLayer += '<div class="boardGame-stones-row">';
            for (let j = 0; j < this.size; j++)
            {
                const id = this.columns[j] + ',' + this.rows[indexRows];
                htmlStoneLayer += '<div class="boardGame-stone" (click)="stoneClick($event)" id="' + id + '"></div>';
            }
            htmlStoneLayer += '</div>';

            // Ligne square
            htmlStoneLayer += '<div class="boardGame-stones-row squareCenter">';
            indexColumns = 1;
            for (let j = 0; j < this.squarePerEvenLines; j++)
            {
                const id = this.columns[indexColumns] + '-' + this.columns[indexColumns + 1] + ','
                  + this.rows[indexRows] + '-' + this.rows[indexRows + 1];
                htmlStoneLayer += '<div class="boardGame-stone" (click)="stoneClick($event)" id="' + id + '"></div>';
                indexColumns += 2;
            }
            htmlStoneLayer += '</div>';

            indexRows++;

            // Ligne sans offset
            htmlStoneLayer += '<div class="boardGame-stones-row offset">';
            for (let j = 0; j < this.size; j++)
            {
                const id = this.columns[j] + ',' + this.rows[indexRows];
                htmlStoneLayer += '<div class="boardGame-stone " onclick="stoneClick($event)" id="' + id + '"></div>';
            }
            htmlStoneLayer += '</div>';

            if (i < this.squarePerEvenLines)
            {
                // Ligne square
                htmlStoneLayer += '<div class="boardGame-stones-row squareCenter no-offset">';
                indexColumns = 0;
                for (let j = 0; j < this.squarePerOddLines; j++)
                {
                    const id = this.columns[indexColumns] + '-' + this.columns[indexColumns + 1] + ','
                      + this.rows[indexRows] + '-' + this.rows[indexRows + 1];
                    htmlStoneLayer += '<div class="boardGame-stone" onclick="stoneClick($event)" id="' + id + '"></div>';
                    indexColumns += 2;
                }
                htmlStoneLayer += '</div>';
            }

            indexRows++;

        }

        htmlStoneLayer += '</div>';

        return htmlStoneLayer;
    }
}
