> Client side parser of data from https://logbook.glidernet.org/

# Usage
```js
 import { glidernetService } from "./index.js"

// Use a proxy for handling CORS
glidernetService.proxy = "https://yellowdigital.nl/expo/glidernet/proxy.php?"

// Usage
const day = await glidernetService.getLogbook({
    a: "EHSB",
    date: "26092021",
})

// Filter on callsign
const callSign = 'M5'
const suggestions = day.filter((elem) => elem.callSign === callSign)

console.log("Last flight of M5 on 26092021");

// Show last item
console.log(suggestions.slice(-1)[0]);
```