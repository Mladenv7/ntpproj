const AdItem = ({adData}) => {
    return (  
        <article>
            <div>
                {/* picture goes here */}
            </div>
            <div>
                <h4>{adData.AskingPrice.toFixed(2)} €</h4>
                <p>{adData.Description}</p>
            </div>
        </article>
    );
}
 
export default AdItem;