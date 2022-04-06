export default function formatter(currency){
    let formatter;
    if(currency === 'ARS'){
        formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 2
        })
    }else{
        formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        })
    }
    return formatter;
}