
function Item({icon, number, donvi}){

    return(
        <div className="d-flex flex-column mx-3 mt-2 item">
            <i className={`${icon}`}></i>
            <span>{`${number}(${donvi})`|| ''}</span>
        </div>
    )
}

export default Item;
