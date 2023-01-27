function OverlayShadows({isUserMobile, width}: {isUserMobile: boolean, width: number}){

    return (
        <>
            <div className={"shadow one" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}></div>
            <div className={"shadow two" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}></div>
        </>
    );
}

export default OverlayShadows;