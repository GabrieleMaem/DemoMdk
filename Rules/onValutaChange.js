/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onValutaChange(clientAPI) {
    let valuta = clientAPI.getPageProxy().getControl("valutaProp");
    let valutaChange = clientAPI.getPageProxy().getControl("altraValutaPicker");
    let valutaChangeValue = valutaChange.value();
    valuta.setValue(valutaChangeValue);
}
