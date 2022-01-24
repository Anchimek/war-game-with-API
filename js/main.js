let deckID 
let remaining
let cpuScore 
let playerScore 
let cardOne
let cardTwo
const firstCard = document.getElementById('card-one')
const secondCard = document.getElementById('card-two')
const winner = document.getElementById('winner')
const drawBtn = document.getElementById('draw-cards')
const newGameBtn = document.getElementById('new-game')
const cardsValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE',]

newGameBtn.addEventListener('click', async () => {
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await res.json()
    .catch(() => {
        firstCard.innerHTML = `<img src='./img/cardbg.jpg' alt='' />`
        secondCard.innerHTML = `<img src='./img/cardbg.jpg' alt='' />`
        alert('Something went wrong. Please reload a page')
    })

    //new deck
    deckID = data.deck_id
    
    //default values
    cpuScore = 0 
    playerScore = 0
    document.getElementById('cpu-points').textContent = `CPU points: ${cpuScore}`
    document.getElementById('user-points').textContent = `My points: ${playerScore}`
    winner.textContent = `War game`
    secondCard.innerHTML = `<img src='./img/cardbg.jpg' alt='' />`
    firstCard.innerHTML = `<img src='./img/cardbg.jpg' alt='' />`

    //display remaining cards
    remaining = data.remaining
    document.getElementById('cards-remaining').textContent = `Cards remaining: ${remaining}`

    drawBtn.disabled = false
    newGameBtn.disabled = true
})

drawBtn.addEventListener('click', async () => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    const data = await res.json()
    .catch(() => {
        firstCard.innerHTML = `<img src='./img/cardbg.jpg' alt='' />`
        secondCard.innerHTML = `<img src='./img/cardbg.jpg' alt='' />`
        alert('Something went wrong. Please reload a page')
    })

    //display remaining cards
    remaining = data.remaining
    document.getElementById('cards-remaining').textContent = `Cards remaining: ${remaining}`

    cardOne = data.cards[0]
    cardTwo = data.cards[1]

    //display cards
    firstCard.innerHTML = `<img src='${cardOne.image}' />`
    secondCard.innerHTML = `<img src='${cardTwo.image}' />`

    //check winner
    const cardOneValue = cardsValue.indexOf(cardOne.value)
    const cardTwoValue = cardsValue.indexOf(cardTwo.value)
    if(cardOneValue > cardTwoValue) {
        cpuScore++
        document.getElementById('cpu-points').textContent = `CPU points: ${cpuScore}`
        winner.textContent = `Computer wins the round!`
    }
    else if (cardTwoValue > cardOneValue) {
        playerScore++
        document.getElementById('user-points').textContent = `My points: ${playerScore}`
        winner.textContent = `You wins the round!`
    } 
    else winner.textContent = `It's a tie!`

    //display winner
    if(remaining === 0) {
        if(cpuScore > playerScore) winner.textContent = `Computer won the game!`
        else if(cpuScore < playerScore) winner.textContent = `You won the game!`
        else winner.textContent = `It's a tie!`
        newGameBtn.disabled = false
        drawBtn.disabled = true
    } 
})
