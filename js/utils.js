'use strict'

function creatBoard(size) {

    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {

            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }

    }
    // console.log(board);
    return board
}

function renderBoard(mat, selector) {


    var strHTML = `<table border="1"><tr><th colspan="${gLevel.SIZE}" ><span class="counter"></span></span><button onclick="emojiClick()" class="emoji"></button><span class="flag"><span class="sec"></span></th></tr><tbody>`
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            var cell
            const className = `cell cell-${i}-${j}`
            if (mat[i][j].isMine) {
                cell = MINE
            } else {
                cell = mat[i][j].minesAroundCount
            }

            strHTML += `<td oncontextmenu="onCellMarked(${i},${j})" onclick="cellClicked(${i},${j})" class="${className}"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}

function getRandomLocations(bord) {
    var locations = []
    for (var i = 0; i < bord.length; i++) {
        for (var j = 0; j < bord[0].length; j++) {
            if (bord[i][j].isMine) continue

            var pos = { i, j }
            locations.push(pos)

        }

    }
    const randIdx = getRandomInt(0, locations.length)
    // console.log(locations[randIdx]);
    return locations[randIdx]
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    if (value === 0) {
        elCell.style.backgroundColor = "gray"


    } else if (gBoard[location.i][location.j].isMine ||( value === EMPTY &&!gBoard[location.i][location.j].isMarked)) {
        if (gCountMine >= 0) {
            elCell.style.backgroundColor = "red"
        }
        elCell.innerHTML = value
    } else if (gBoard[location.i][location.j].isMarked || value === EMPTY) {
        elCell.innerHTML = value

    } else {
        elCell.style.backgroundColor = "gray"
        elCell.innerHTML = value
    }






    // else if (gBoard[location.i][location.j].isMarked || gBoard[location.i][location.j].isMine|| value===EMPTY) {
    //     if(gCountMine >0){
    //         elCell.style.backgroundColor = "red"
    //         elCell.innerHTML = value
    //     }else{

    //         elCell.innerHTML = value
    //     }


    // } else {

    //     elCell.style.backgroundColor = "gray"
    //     elCell.innerHTML = value

    // }



}

