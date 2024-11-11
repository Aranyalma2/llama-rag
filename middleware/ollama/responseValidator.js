module.exports = function (reponse) {
    const regex_TAG = /```homeassistant([\s\S]*?)```/;
    if(!regex_TAG.test(reponse)){
        return false;
    }
    const match = reponse.match(regex_TAG)[1].trim();
    if (match) {
        try {
            const content = JSON.parse(match);
            return content.hasOwnProperty('service') && content.hasOwnProperty('target_device');
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    return false;

    
};