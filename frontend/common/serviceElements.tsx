// Universal
export const serviceBasicsElems = (
    <>
        <p>On-location only, I do not currently have a studio.</p>
        <p>Although you{"'"}re allowed to change your outfit as many times as you wish, keep in mind that you could receive fewer than the quoted number of pictures if changing takes too long.</p>
        <p>I encourage you to bring props. They help express your personality, and add variety to your portraits.</p>
    </>
);

export const serviceNotesElem = (
    <>
        <div className={"main__content--headline"}>Notes</div>
        <p>Session fee includes sales tax.</p>
        <p>Check or cash payment is due before your session begins. Refunds will be granted only if I lose your photos before delivering them to you, or if I am unhappy with the results and unwilling to deliver substandard photos.</p>
        <p>If you{"'"}re unhappy with your portraits, please explain why and request a reshoot.</p>
        <p>Within two weeks, your portraits should be edited and ready for delivery. My watermark may be present, but I believe you{"'"}ll agree that it{"'"}s subtle.</p>
    </>
);

export const servicePreparationElems = (
    <>
        <div className={"main__content--headline"}>Preparation</div>
        <div className={"main__content--subheading"}>Clothing</div>
        <p>As a general rule, avoid articles of clothing that are all-white, all-black, or strongly-colored. This is especially true if you have white skin, because you may look washed-out. Pastels are good. Greens and yellows are usually bad.</p>
        <p>Close-cut outfits look nicer than very loose-fit ones.</p>

        <div className={"main__content--subheading"}>Makeup</div>
        <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re shiny.</p>
        <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>
        <p>And I highly recommend that you bring your finishing powder. Even if you protect your makeup, your skin could be glossy, and your finishing powder should be able to solve that.</p>

        <div className={"main__content--subheading"}>Skin</div>
        <p>Remove in advance tight-fit articles such as wrist watches, as they may leave red skin marks.</p>
        <p>If you have dry, flaky skin, moisturizers such as those offered by CeraVe may be very beneficial. But moisturizers are glossy, so do not apply any before your session.</p>
    </>
);

export const serviceTitle = {
    senior: createServiceTitle("Senior Portrait Sessions"),
    boudoir: createServiceTitle("Boudoir and Erotic Portrait Sessions"),
    couples: createServiceTitle("Couples Portrait Sessions"),
    family: createServiceTitle("Family Portrait Sessions"),
    wedding: createServiceTitle("Wedding Photography"),
    other: createServiceTitle("All Other Photography"),
}

function createServiceTitle(title: string){
    return (
        <><div className={"main__content--headline"}>{title}</div></>
    )
}

// Page-specific
// Services

export const serviceBulletsSenior = (
    <>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Price: $435</li>
            <li>Time: 1.25hr</li>
        </div>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Digital Photos: 10-15</li>
            <li>Outfits: Unlimited</li>
        </div>
    </>
);

//Boudoir

export const serviceBasicsBoudoir = (
    <>
        <p>If you would like to see more of this portfolio, please contact me. I don{"'"}t share most of it on my website.</p>
        <p>I do not currently have a studio. If we shoot in a hotel, the price will be added to the session fee. Alternatively you may provide a location.</p>
        <p>You may ask one female friend to accompany you.</p>
        <p>Any level of nudity is permitted. You will have to sign a form stating that you are indeed at least 18, and I{"'"}ll check your ID and photograph it so that I have a copy. This is for my protection.</p>
        <p>If this is for OnlyFans or such, that is fine -- it{"'"}s no problem to me.</p>
        <p>Although you{"'"}re allowed to change your outfit as many times as you wish, keep in mind that you could receive fewer than the quoted number of pictures if changing takes too long.</p>
    </>
);

export const serviceBulletsBoudoir = (
    <>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Price: $475</li>
            <li>Time: 1.75hr</li>
        </div>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Digital Photos: 10-15</li>
            <li>Outfits: Unlimited</li>
        </div>
    </>
);

export const servicePreparationBoudoir = (
    <>
        <div className={"main__content--headline"}>Preparation</div>

        <div className={"main__content--subheading"}>Skin</div>
        <p>Bras and panties usually leave red marks, so before the shoot either wear e.g. a loose-fit bikini under your clothing instead, or nothing at all. The same applies for accessories, such as wrist watches.</p>
        <p>If you have dry, flaky skin, moisturizers such as those offered by CeraVe may be very beneficial. But moisturizers are glossy, so do not apply any before your session.</p>

        <div className={"main__content--subheading"}>Makeup</div>
        <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re shiny.</p>
        <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>
        <p>And I highly recommend that you bring your finishing powder. Even if you protect your makeup, your skin could be glossy, and your finishing powder should be able to solve that.</p>
    </>
);

//Couples

export const servicePreparationCouples = (
    <>
        <div className={"main__content--headline"}>Preparation</div>
        <div className={"main__content--subheading"}>Clothing</div>
        <p>As a general rule, avoid articles of clothing that are all-white, all-black, or strongly-colored. This is especially true if you have white skin, because you may look washed-out. Pastels are good. Greens and yellows are usually bad.</p>
        <p>In particular, avoid wearing shades that are extreme opposites of your partner{"'"}s clothing. For example, if you wear a bright white shirt and your partner wears a dark gray, it will be difficult to capture good photos.</p>
        <p>Close-cut outfits look nicer than very loose-fit ones.</p>

        <div className={"main__content--subheading"}>Makeup</div>
        <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re shiny.</p>
        <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>
        <p>And I highly recommend that you bring your finishing powder. Even if you protect your makeup, your skin could be glossy, and your finishing powder should be able to solve that.</p>

        <div className={"main__content--subheading"}>Skin</div>
        <p>Remove in advance tight-fit articles such as wrist watches, as they may leave red skin marks.</p>
        <p>If you have dry, flaky skin, moisturizers such as those offered by CeraVe may be very beneficial. But moisturizers are glossy, so do not apply any before your session.</p>
    </>
);

export const serviceBulletsCouples = (
    <>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Price: $425</li>
            <li>Time: 1.25hr</li>
        </div>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Digital Photos: 8-12</li>
            <li>Outfits: Unlimited</li>
        </div>
    </>
);

//Family

export const serviceBasicsFamily = (
    <>
        <p>On-location only, I do not currently have a studio.</p>
    </>
);

export const serviceBulletsFamily = (
    <>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Price: $425</li>
            <li>Time: 1.25hr</li>
        </div>
        <div className={"main__content--two-col-list--sub-container"}>
            <li>Digital Photos: 4-12</li>
            <li>Outfits: Unlimited</li>
        </div>
    </>
);

export const servicePreparationFamily = (
    <>
        <div className={"main__content--headline"}>Preparation</div>
        <div className={"main__content--subheading"}>Clothing</div>
        <p>As a general rule, avoid articles of clothing that are all-white, all-black, or strongly-colored. This is especially true if you have white skin, because you may look washed-out. Pastels are good. Greens and yellows are usually bad.</p>
        <p>In particular, avoid wearing shades that are extreme opposites. For example, if you wear a bright white shirt and your grandmother wears a dark gray shirt, it will be difficult to capture good photos.</p>
        <p>Close-cut outfits look nicer than very loose-fit ones.</p>

        <div className={"main__content--subheading"}>Makeup</div>
        <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re shiny.</p>
        <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>

        <div className={"main__content--subheading"}>Skin</div>
        <p>Remove in advance tight-fit articles such as wrist watches, as they may leave red skin marks.</p>
        <p>If you have dry, flaky skin, moisturizers such as those offered by CeraVe may be very beneficial. But moisturizers are glossy, so do not apply any before your session.</p>
    </>
);

//Other
export const serviceBasicsOther = (
    <>
        <p>On-location only, I do not currently have a studio.</p>
        <p>In most cases, my standard sessions structure is sufficient for my clients{"'"} needs. Please see the bullet points below.</p>
        <p>If your needs may require more than what my my standard session offers, please contact me to discuss the details.</p>
    </>
);

//Weddings

export const serviceBasicsWedding = (
    <>
        <p>My session fee is the same even if you need fewer than eight hours, so I recommend that you keep me around for as long as there{"'"}s anything to photograph.</p>
        <p>The number of images you receive varies based on many factors, the most influential of which being how long I stay. As such the quote below is an average for an eight-hour session, not a guarantee.</p>
        <p>Because at weddings I aim to capture moments rather than stunning aesthetic qualities, you should receive many images, but they will not receive extensive editing. So be sure that you{"'"}re happy with your makeup.</p>
    </>
);

export const servicePreparationWedding = (
    <>
        <div className={"main__content--headline"}>Preparation</div>
        <div className={"main__content--subheading"}>Makeup</div>
        <p>If you do not wear makeup, please wash your face before your session to remove skin oils -- they{"'"}re shiny.</p>
        <p>If you wear makeup, please be extremely careful to keep it smooth. If it{"'"}s blotchy, I may not be able to edit your photos enough to save them.</p>

        <div className={"main__content--subheading"}>Skin</div>
        <p>Remove in advance tight-fit articles such as wrist watches, as they may leave red skin marks.</p>
        <p>If you have dry, flaky skin, moisturizers such as those offered by CeraVe may be very beneficial. But moisturizers are glossy, so do not apply any before your session.</p>
    </>
);

export const serviceBulletsWedding = (
    <>
            <li>Price: $925</li>
            <li>Time: 8hr</li>
            <li>Digital Photos: 500</li>
    </>
);

export const serviceNotesWedding = (
    <>
        <div className={"main__content--headline"}>Notes</div>
        <p>Session fee includes sales tax.</p>
        <p>Check or cash payment is due before your session begins. Refunds will be granted only if I lose your photos before delivering them to you.</p>
        <p>Within two months, your photos should be edited and ready for delivery. My watermark may be present on some images, but I believe you{"'"}ll agree that it{"'"}s subtle.</p>
    </>
);