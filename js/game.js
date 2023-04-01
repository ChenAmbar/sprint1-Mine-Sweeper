'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''
const FLAG_FAILE = '🏳️'
const LIFE = '❤️'

var gGameOnClick
var gBoardGame
var gBoard
var gLevel
var gGame
var gCountMine
var intervalTime
// var size = 4

gLevel = {
    SIZE: 8,
    MINES: 16
}


function onInit() {
    gGameOnClick = false
    gCountMine = 3
    clearInterval(intervalTime)
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }

    gBoard = creatBoard(gLevel.SIZE)
    setMinesNegsCount(gBoard)

    countAllNeighborsInBoard(gBoard)
    renderBoard(gBoard, '.game-bord')
    renderGgame()
    lifeCount(gCountMine)




    console.table(gBoard);

}

function setMinesNegsCount(board) {


    if (gLevel.SIZE === 4) {
        for (var i = 0; i < gLevel.MINES; i++) {
            var randomIdx = getRandomLocations(board)
            board[randomIdx.i][randomIdx.j].isMine = true
        }
    }

    if (gLevel.SIZE === 8) {
        for (var i = 0; i < gLevel.MINES; i++) {
            var randomIdx = getRandomLocations(board)
            board[randomIdx.i][randomIdx.j].isMine = true
        }
    }


    if (gLevel.SIZE === 12) {
        for (var i = 0; i < gLevel.MINES; i++) {
            var randomIdx = getRandomLocations(board)
            board[randomIdx.i][randomIdx.j].isMine = true
        }
    }

}

function cellClicked(i, j) {
    if (!gGameOnClick) {

        startTimer()
    }
    if (!gGame.isOn) {
        return
    }

    const cell = {
        i: i,
        j: j
    }

    if (gBoard[i][j].isShown) return
    if (gBoard[i][j].isMarked) return
    if (gBoard[i][j].isMine) {

        gCountMine--
        lifeCount(gCountMine)
        renderCell(cell, MINE)
        setTimeout(function () {
            renderCell(cell, EMPTY)
        }, 1500)
        // gBoard[i][j].isMarked = true
        // gGame.markedCount++

    } else if (gBoard[i][j].minesAroundCount === 0) {
        ShownNeighbors(i, j, gBoard)
        // gBoard[i][j].isShown = true
        renderCell(cell, gBoard[i][j].minesAroundCount)

    } else {

        gGame.shownCount++
        gBoard[i][j].isShown = true
        renderCell(cell, gBoard[i][j].minesAroundCount)
    }
    gGameOnClick = true

    checkGameOver()
    renderGgame()

}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (j === cellJ && i === cellJ) continue
            if (mat[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}

function countAllNeighborsInBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board)
        }
    }
}
function onCellMarked(i, j) {
    event.preventDefault()
    // startTimer()
    if (!gGame.isOn) {
        return
    }
    const markCell = {
        i: i,
        j: j
    }
    const cell = gBoard[markCell.i][markCell.j]

    if (cell.isMarked) {
        gGame.markedCount -= 1

        renderCell(markCell, EMPTY)
        cell.isMarked = false
    } else if (cell.isShown) {
        return
    } else {

        cell.isMarked = true
        gGame.markedCount += 1
        renderCell(markCell, FLAG)
    }
    checkGameOver()
    renderGgame()


}

function ShownNeighbors(cellI, cellJ, mat) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (i === cellI && j === cellJ) continue
            const location = {
                i: i,
                j: j
            }
            if (gBoard[i][j].isMarked || gBoard[i][j].isShown || gBoard[i][j].isMine) {
                continue
            } else {
                gBoard[i][j].isShown = true
                gGame.shownCount++
                renderCell(location, gBoard[i][j].minesAroundCount)
            }
            if (gBoard[i][j].minesAroundCount === 0) ShownNeighbors(i, j, gBoard)
        }
    }


}
function checkGameOver() {

    if (gCountMine === 0) {
        clearInterval(intervalTime)
        showAllMines()
        gGame.isOn = false
    } else if (gGame.shownCount === (gLevel.SIZE ** 2) - gGame.markedCount && gLevel.MINES === gGame.markedCount) {
        clearInterval(intervalTime)
        showAllMines()

        gGame.isOn = false
    }
    // console.log(countCellShown);

    console.log(gGame.isOn);
    console.log(gGame);
}

function bottons() {
    var strHTML = ''

    strHTML += `<button onclick="buttonLavel(4)">Beginner</button>`
    strHTML += `<button onclick="buttonLavel(8)">Medium</button>`
    strHTML += `<button onclick="buttonLavel(12)">Expert</button>`
    var elBottons = document.querySelector(".buttons")
    elBottons.innerHTML = strHTML


}
function buttonLavel(level) {
    console.log(level);
    if (level === 4) {
        gLevel.SIZE = 4
        gLevel.MINES = 2

    }
    if (level === 8) {
        gLevel.SIZE = 8
        gLevel.MINES = 14

    }
    if (level === 12) {
        gLevel.SIZE = 12
        gLevel.MINES = 32
    }
    onInit()

    console.log(level);
}

function renderGgame() {
    const elCounter = document.querySelector(".counter")
    elCounter.innerHTML = gGame.shownCount

    const elFlag = document.querySelector(".flag")
    elFlag.innerHTML = `${FLAG}: ${gGame.markedCount}`

    var emoji = "🙂"
    var emojiWin = "😁"
    var emojiLose = '💀'
    const elEmoji = document.querySelector(".emoji")
    console.log(gGame.isOn);

    if (gCountMine === 0) {

        elEmoji.innerHTML = emojiLose
    } else if (!gGame.isOn) {
        elEmoji.innerHTML = emojiWin
    } else {

        elEmoji.innerHTML = emoji
    }
    bottons()


}

function emojiClick() {
    gGame.isOn = true
    onInit()
}

function lifeCount(gCountMine) {

    var life = ''
    for (var i = 0; i < gCountMine; i++) {
        life += LIFE
    }
    const elLife = document.querySelector(".life")

    elLife.innerHTML = life
    console.log(life);


}

function startTimer() {
    if (!gGameOnClick) {
        var startTime = Date.now()
        const elTimer = document.querySelector('.timer')
        intervalTime = setInterval(() => {
            const diff = Date.now() - startTime
            elTimer.innerText = (diff / 1000).toFixed(2)
        }, 10)
    }

}


function showAllMines(){
    for (var i = 0; i <gBoard.length; i++) {
        for (var j = 0; j <gBoard[0].length ; j++) {
            if(gBoard[i][j].isMine){
                const cellMine={
                    i:i,
                    j:j
                }
                renderCell(cellMine,MINE)
            }
        }
    }

}


