import React, {useState, useEffect, lazy, Suspense} from "react";
import {openSource} from "../../portfolio";
import Contact from "../contact/Contact";
import {getCachedProfile, setCachedProfile} from "../../profileCache";

const GithubProfileCard = lazy(() =>
  import("../../components/githubProfileCard/GithubProfileCard")
);
export default function Profile() {
  const [prof, setrepo] = useState([]);
  function setProfileFunction(array) {
    setrepo(array);
  }

  useEffect(() => {
    let isMounted = true;

    if (openSource.showGithubProfile === "true") {
      const getProfileData = () => {
        // Preserve the cached GitHub data across refreshes for 10 minutes so
        // the GitHub profile / contact section does not re-fetch on every load.
        const cached = getCachedProfile();
        if (cached) {
          if (isMounted) {
            setProfileFunction(cached);
          }
          return;
        }

        fetch("/profile.json")
          .then(result => {
            if (result.ok) {
              return result.json();
            }
          })
          .then(response => {
            if (!isMounted || !response || !response.data || !response.data.user) {
              return;
            }
            setCachedProfile(response.data.user);
            setProfileFunction(response.data.user);
          })
          .catch(function (error) {
            console.error(
              `${error} (because of this error GitHub contact section could not be displayed. Contact section has reverted to default)`
            );
            if (isMounted) {
              setProfileFunction("Error");
            }
            openSource.showGithubProfile = "false";
          });
      };
      getProfileData();

      return () => {
        isMounted = false;
      };
    }
  }, []);
  if (
    openSource.display &&
    openSource.showGithubProfile === "true" &&
    !(typeof prof === "string" || prof instanceof String)
  ) {
    return (
      <Suspense fallback={null}>
        <GithubProfileCard prof={prof} key={prof.id} />
      </Suspense>
    );
  } else {
    return <Contact />;
  }
}