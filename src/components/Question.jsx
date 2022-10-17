import Choice from "./Choice";
import he from 'he'

function Question(props) {
    console.log(props)

    let choices = props.item.answer.map((e,index) => (<Choice key={index} id={e.id} value={e.choice} handleClick={props.handleClick} 
        qs={props.item.id} select = {e.isSelected} correct={e.isCorrect} end={props.end}  />))
    
    return(
        <div className="question">
           <h3>{he.decode(props.item.qs)} </h3>
           <div className="choices">
           {choices}
           </div>
            
        </div>
        
    )
}

export default Question