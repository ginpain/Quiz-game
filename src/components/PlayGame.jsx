

function PlayGame(props) {
    return(

        <div className="play-start">
            <h1 className="title">Quizzical</h1>
            <p className="start-game">Do you love challenges? play this quiz game and have fun at the same time!!</p>
            <button onClick={props.handleClick}>Start Quiz</button>
            <footer> <p>solo project built by <a  href="https://www.linkedin.com/in/mo-smouni/" target="_blank">Mohamed Smoni</a></p> </footer>
        </div>
    )
}

export default PlayGame