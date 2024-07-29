import React from "react";
import { Fade } from "react-awesome-reveal";

const HeroSectionCareer = () => {
  return (
    <>
      <Fade triggerOnce={true}>
        <div className="w-full hero-career" data-scroll-section>
          <div className="container hero-inner">
            <h3 className="rob">
              Work at <span className="noto bold">Infinity Waves</span>
            </h3>
            <h1 className="big-font noto bold special">
              Join us and ignite creativity through innovation.
            </h1>
            <h5 className="pop">
              Find out how you can have an impact, <br /> Uncover the variety of
              work environments, international offices, <br />
              and prospects for students.
            </h5>
            <p className="pop blue">Contact Us Now</p>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default HeroSectionCareer;
