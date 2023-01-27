import store from '@/store'

export default function webSocket(channel) {
  const socket = new WebSocket(
    //   `ws://10.11.61.29:8000/ws/${channel}/`
    //  `ws://10.11.58.85:8000/ws/${channel}/`
    `ws://94.231.212.117:8000/ws/${channel}/`

    //  `ws://10.11.61.29:8000/ws/${channel}/?token=${store.getters.getToken}`
  )
  return socket
}
