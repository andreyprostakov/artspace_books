import React, { useRef, useState } from 'react'

import Context from 'store/events/Context'

const Provider = (props) => {
  const { children } = props

  const [subscribers, setSubscribers] = useState({})

  const contextValue = {
    subscribeToEvent: (event, subscriber) => {
      const previousSubscribers = subscribers[event] || []
      setSubscribers({ [event]: [...previousSubscribers, subscriber] })
      console.log([...previousSubscribers, subscriber])
    },
    triggerEvent: (event) => {
      (subscribers[event] || []).forEach(subscriber => subscriber())
    }
  }

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  )
}

export default Provider
