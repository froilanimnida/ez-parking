import LandingPage from "@/components/mobile/LandingPage";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import Platform from "@lib/helper/platform";
import WebLandingPage from "@components/web/LandingPage";

export default function Index() {
    return (
        <>
            {Platform() === "web" ? (
                <WebLandingPage />
            ) : (
                <ResponsiveContainer>
                    <LandingPage />
                </ResponsiveContainer>
            )}
        </>
    );
}
