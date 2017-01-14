import React, { Component } from 'react'
import { observer } from 'mobx-react'
import tinymusic from 'tinymusic'
import SequenceState from '../../SequenceState'

function AudioPlayer() {
  function playSequence() {
    SequenceState.play()
  }
  return (
    <div>
      <h3>Audio Player</h3>
      <button onClick={playSequence}>play!</button>
    </div>
  )
}

export default observer(AudioPlayer)
