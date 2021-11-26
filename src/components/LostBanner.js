import React from 'react'

function LostBanner() {
    return (
        <div>
            <h3>Oops, you clicked the same Pokemon twice...you lose!</h3>
            <p>Try again with new pokemon...</p>
            <button>Play Again</button>
        </div>
    )
}

export default LostBanner