import he from 'he'

function Choice(props) {
    console.log(props)
    function changeColor(ended, selecetd, correct) {
        if (ended) {
            if (selecetd && !correct) {
                return 'choix wrong'
            } else if (correct ) {
                return 'choix correct'
            } else {
                return 'choix other-choices'
            }
        } else {
            if (selecetd) {
                return 'choix selecetd'
            } else {
                return 'choix'
            }
        }

        

    }

    return(
        <>
            <p  
                onClick={(() => props.handleClick(props.qs, props.id))} 
                className= {changeColor(props.end,props.select, props.correct)} 
            >{he.decode(props.value)} </p>
        </>

    )
}

export default Choice