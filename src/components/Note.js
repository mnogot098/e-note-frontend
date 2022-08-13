import React, { useState } from 'react'
import {MdDeleteForever} from 'react-icons/md'

function Note(title) {
  return (
    <div className='note'>
        <span>
            {title}
        </span>
        <div class="note-footer">
            <p>test</p>
            <div className='note-details'> 
              <small>test</small>
              <MdDeleteForever className="delete-icon" size="1.3em"/>
            </div>
        </div>
    </div>
  )
}

export default Note