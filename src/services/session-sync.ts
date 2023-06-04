export class SessionSync{

    private readonly socket:WebSocket; 

    constructor(uri: string){
        this.socket = new WebSocket(uri);

         // Event handler for successful connection
         this.socket.onopen = function(event) {
            console.log('WebSocket connection established.', event);
        };

        this.socket.onmessage = function(event) {
            const message = event.data;
            console.log('Received message:', event, message);
            // Handle the incoming message as needed
        };

        this.socket.onclose = function(event) {
            console.log('WebSocket connection closed.');
        };
    }

    

    sendAudioData(data: Blob): void{
        this.socket.send(data);
    }


}