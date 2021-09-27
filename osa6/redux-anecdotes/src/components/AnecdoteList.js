import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteOf(anecdote))
    dispatch(setNotification(`you voted: ${anecdote.content}`, 5))
}

  return (
    <div>
        {anecdotes
            .filter(anecdote => anecdote.content
            .search(new RegExp(filter, 'i')) > -1)
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote)
                    }
                />
            )
        }
    </div>
  )
}

export default Anecdotes