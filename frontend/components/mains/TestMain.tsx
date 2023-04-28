import {OrientationOptions} from "../../types/layout";
import {BackgroundImage} from "../../utils/SharedBetweenPages";
import Image from "next/image";
import seniorPortrait from '../../photos/svc_cards/senior2.png';
import boudoirPortrait from '../../photos/svc_cards/boudoir.png';
import couplePortrait from '../../photos/svc_cards/couple2.png';
import familyPortrait from '../../photos/svc_cards/family2.png';
import headshotPortrait from '../../photos/svc_cards/headshot.png';
import themedPortrait from '../../photos/svc_cards/themed.png';
import otherPortrait from '../../photos/svc_cards/other.png';
import weddingPortrait from '../../photos/svc_cards/wedding.png';
import Navbar from "../Navbar";
import {navbarOptions} from "../../common/variables";
import NavbarLinks from "../NavbarLinks";
import {orientations} from "../../hooks/useOrientation";
import landscapeBackground from "../../public/backgrounds/hp.jpg";
import portraitBackground from "../../public/backgrounds/mw.jpg";
const cc = console.log;

export function TestMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    const standardCardBottomMessage = "Click for more info.";

    const svcCardData = [
        {
            cardTop: "Senior",
            cardMiddle: seniorPortrait,
            cardUrl: "/svc_cards/senior.png",
        },{
            cardTop: "Family",
            cardMiddle: familyPortrait,
            cardUrl: "/svc_cards/family.png",
        },{
            cardTop: "Couples",
            cardMiddle: couplePortrait,
            cardUrl: "/svc_cards/couple.png",
        },{
            cardTop: "Themed",
            cardMiddle: themedPortrait,
            cardUrl: "/svc_cards/themed.png",
        },{
/*            cardTop: "Headshot",
            cardMiddle: headshotPortrait,
            cardUrl: "/svc_cards/headshot.png",
        },{*/
            cardTop: "Other",
            cardMiddle: otherPortrait,
            cardUrl: "/svc_cards/other.png",

        },{
            cardTop: "Wedding",
            cardMiddle: weddingPortrait,
            cardUrl: "/svc_cards/wedding.png",
        }, {
            cardTop: "Boudoir & Erotic",
            cardMiddle: boudoirPortrait,
            cardUrl: "/svc_cards/boudoir.png",
        }/*,{
            cardTop: "Subcontract",
            cardMiddle: headshotPortrait,
        }*/
    ];

    const svcCardElems = svcCardData.map((e, k) => {
        return (
            <div key={k} className={"services-card__container"}>
                <div className={"services-card__top-row"}>
                    {e.cardTop}
                </div>

                <div className={"services-card__middle-row"}>
                    {/*<img src={e.cardUrl}/>*/}
                    <Image src={e.cardMiddle} alt={"test"} quality={100}/>
                </div>
            </div>
        );
    });

    cc(navbarOpenOrClosed)

    return (
        <>
        <div className={"background"}>
            <Image src={(screenOrientation === orientations.landscape ? landscapeBackground : portraitBackground)}
                   placeholder={"blur"}
                   layout={'fill'}
                   objectFit={'cover'}
                   objectPosition={'center'}
                   alt={'Website Background Portrait'}
            />
        </div>
            <div className={"navigation-pane__container " +  (navbarOpenOrClosed === navbarOptions.open ? "active " : "")}
                onClick={(e) => {
                    setNavbarOpenOrClosed(navbarOptions.closed);
                }
            }>
                <div className={"navigation-pane__links"} onClick={(e) => e.stopPropagation()}>
                    <NavbarLinks
                        setNavbarOpenOrClosed={setNavbarOpenOrClosed}
                    />

                </div>
            </div>

            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <div className={"main__content " + (navbarOpenOrClosed === navbarOptions.open ? "active " : "")}>
                        <Navbar
                            navbarOpenOrClosed={navbarOpenOrClosed}
                            setNavbarOpenOrClosed={setNavbarOpenOrClosed}
                        />

                        <div className={"main__content--equipment--main-container"}>

                            <br/>


                            <div className={"services-cards-spacer"}>
                                {svcCardElems}
                            </div>
                            {/*<div className={"main__content--subheading"}>Standard Portraits</div>
                            <p>
                                Senior portraits, business headshots, couples photos, etc.
                            </p>

                            <p>
                                On-location only, I do not currently have a studio.
                            </p>
                            <p>
                                Although you{"'"}re allowed to change your outfit as many times as you want, keep in mind that you could receive fewer than the quoted number of pictures if changing takes too long.
                            </p>
                            <p>
                                I encourage you to bring props. They help express your personality, and add variety to your portraits.
                            </p>
                            <div className={"main__content--two-col-list--sub-container"}>
                                <li>Price: $435</li>
                                <li>Time: 1.25hr</li>
                            </div>
                            <div className={"main__content--two-col-list--sub-container"}>
                                <li>Digital Photos: 10-15</li>
                                <li>Outfits: Unlimited</li>
                            </div>
                            <br/>

                            <div className={"main__content--subheading"}>Other Sessions</div>
                            <p>
                                Wedding photography or videography, special events, large groups, etc.
                            </p>
                            <p>
                                Contact me to discuss details and pricing.
                            </p>*/}
                        </div>

                        <br/>

                        <div className={"main__content--headline"}>Method</div>

                        <p>My portraiture style is traditional. I direct my clients{"'"} poses, and rarely shoot candids. This may sound difficult, but it{"'"}s not -- except for a bit of muscle fatigue! Because I will guide your poses, it{"'"}s quite simple.</p>

                        <div className={"main__content--headline"}>Notes</div>

                        <p>Session fee includes sales tax.</p>

                        <p>Check or cash payment is due before your session begins. Refunds will be granted only if I lose your photos before delivering them to you, or if I am unhappy with the results and unwilling to deliver substandard photos.</p>

                        <p>If you{"'"}re unhappy with your portraits, please explain why and request a reshoot.</p>

                        <p>You (or your parent) will have to sign a model release, which allows me to use the photos e.g. in this website{"'"}s gallery.</p>

                        <p>Within two weeks, your portraits should be edited and ready for delivery. My watermark may be present, but I believe you{"'"}ll agree that it{"'"}s subtle.</p>

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

                    </div>
                </header>
            </div>
        </>
    );
}
