import {OrientationOptions} from "../../types/layout";
import {BackgroundImage} from "../../utils/SharedBetweenPages";
import Link from "next/link";

export function BioMain({isUserMobile, width, screenOrientation}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>

                            <div className={"main__content--headline"}>Bio</div>
                            <div className={"main__content--subheading"}>Jerrad Johnson</div>

                            <p>
                                My journey into photography was fueled by a desire for quality pictures of my many hobbies. Eventually I realized that despite having a long, proven track record of possessing net negative aesthetic talent, I actually had an eye for this. Being the only form of beauty I was capable of producing, I was driven to nurture my talent. Naturally I began with captive models, the <Link href={"https://www.youtube.com/watch?v=THvCDn8mGwo"}><a target={"_blank"}>implication</a></Link> is a form of witness control. The parrots at Reptile Gardens were the subject of countless artistic blunders, and their sacrifice was honored. That is how I learned to focus on the background and position my model to complement it.
                            </p>

                            <p>
                                Feeling confident in my ability to at least create images with beautiful, blurred backgrounds, I began working with models who have much more fragile psyches: humans! Shooting as often as five times a week, I practiced my studies of posing and lighting.
                            </p>

                            <p>
                                Both my interest in psychology, and my technical mindset played vital roles in the style I developed. On the one hand I wanted to pose my models perfectly, exhibiting impeccable form, and on the other hand I wanted them to show emotion or personality. Later when I studied aesthetic philosophy, I learned that <span className={"font--bold"}>intentional</span> self presentation <i>is</i> traditional portraiture. So my style is traditional! But fair warning, I{"'"}m far from being a traditional character. This is apparent in my photography too, having captured everything from business headshots and lightbox work, to art nudes and erotica.
                            </p>

                            <p>
                                I{"'"}m a man of many interests, varied experiences, and unconventional points of view. Although photography is important to me, I{"'"}m primarily a software developer. This website is intended to be my most substantial software portfolio project. And I{"'"}m also a student, triple majoring in psychology, philosophy, and computer science. Some seem to believe that teaching me psychology is akin to infecting humanity with the plague. I am not sure why that is, I would never do something like sarcastically telling you that I{"'"}m a saint who would never troll or make off-the-wall comments for sheer amusement.
                            </p>

                            <p>
                                Anyway there is surprisingly one arena where all three majors intersect, and that is philosophy of mind. I didn{"'"}t even know that until I took the class, so I get no brownie points for relentless dedication to a single cause.
                            </p>

                            <p>
                                Instead I prefer pursuing many causes, so to speak. I have more skills than I have time to cultivate them. I{"'"}ve tried so many other things too, ranging from building speakers all the way to stripping for a bachelorette party. But how I most enjoy spending my time is hanging out with my German Shepherd, watching good movies, capturing beautiful photos, driving fun cars, writing, making people laugh, learning, and going to the gym. Oh, and lap dancing.
                            </p>

                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}



