module.exports = function (response) {
    const regex_TAG = /```homeassistant([\s\S]*?)```/;
    if(!regex_TAG.test(response)){
        return false;
    }
    const match = response.match(regex_TAG)[1].trim();
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