class ServerMessageParser {
    parse(message) {
        let errors = JSON.parse(message);
        let errorList = [];
        for (let val of Object.values(errors)) {
            errorList.push(val);
        }
        return errorList;
    }
}

export default new ServerMessageParser()