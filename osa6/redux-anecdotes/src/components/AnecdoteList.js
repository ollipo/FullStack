import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
        {anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => 
                        dispatch(voteOf(anecdote.id))
                    }
                />
            )
        }
    </div>
  )
}

export default Anecdotes