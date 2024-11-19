module.exports = function (response) {
    let correctedResponse = response;

    correctedResponse = correctedResponse.replaceAll(/({.*})\n(?={.*})/g, "");
    correctedResponse = correctedResponse.replaceAll("light.color", "light.turn_on");

    const changed = correctedResponse !== response;

    return { correctedResponse, changed };
}