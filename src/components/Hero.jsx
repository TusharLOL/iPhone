import gsap from "gsap"; // Import GSAP for animations.
import { useGSAP } from "@gsap/react"; // Import the GSAP React hook.
import { heroVideo, smallHeroVideo } from "../utils"; // Import video file paths from utils.
import { useState } from "react"; // Import useState hook to manage state.
import { useEffect } from "react"; // Import useEffect hook to manage lifecycle events.

const Hero = () => {
    // State to store the source of the video based on screen size.
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

    // Function to update the video source dynamically on window resize.
    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo); // Set to smaller video for screens narrower than 760px.
        } else {
            setVideoSrc(heroVideo); // Set to the regular video for wider screens.
        }
    };

    // useEffect to handle the video source update when the window is resized.
    useEffect(() => {
        // Add event listener for resize events.
        window.addEventListener('resize', handleVideoSrcSet);

        // Cleanup: Remove the resize event listener when the component unmounts.
        return () => {
            window.removeEventListener('resize', handleVideoSrcSet);
        };
    }, []); // Empty dependency array ensures this runs only once on mount.

    // GSAP animations for hero text and call-to-action button.
    useGSAP(() => {
        // Animate the hero text opacity after a 2-second delay.
        gsap.to('#hero', {
            opacity: 1,
            delay: 2,
        });

        // Animate the call-to-action button's position and opacity after a 2-second delay.
        gsap.to('#cta', {
            y: -50, // Move up by 50px.
            opacity: 1, // Make it fully visible.
            delay: 2,
        });
    }, []); // Empty dependency array ensures this runs only once on mount.

    return (
        // Hero section container.
        <section className='w-full nav-height bg-black relative'>
            {/* Main content of the hero section */}
            <div className="h-5/6 w-full flex-center flex-col">
                {/* Hero title */}
                <p id="hero" className='hero-title'>iPhone 15 Pro</p>
                <div className="md:w-10/12 w-9/12">
                    {/* Video element to play the hero video */}
                    <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
                        {/* Dynamic source for the video based on the current state */}
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Call-to-action (CTA) section */}
            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                {/* Buy button */}
                <a href="#highlights" className="btn">
                    Buy
                </a>
                {/* Pricing information */}
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>
        </section>
    );
};

export default Hero; // Export the Hero component for use in other parts of the app.
