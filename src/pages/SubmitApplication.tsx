import NavBar from '../components/sidebar/navHeader';
import React from 'react';
const banner: string = require('../assets/assets/banner.png').default;

type Props = {};

function SubmitApplication({}: Props) {
  return (
    <>
      <div className="flex flex-col  h-screen absolute w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden flex justify-center lg:ml-[5rem] md:ml-0 ">
                {/* form */}
                <div className="flex flex-col w-[60%] dark:bg-dark-tertiary ml-[7rem] mt-[7rem]  mb-[5rem] rounded-lg p-5 md:ml-0 md:w-[90%] ">
                  {/* TITLE */}
                  <div className="flex justify-center">
                    <p className="text-white  font-semibold underline font-size-10">
                      ATLP RWANDA
                    </p>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="flex  justify-start width-[80%] ml-3 mt-5">
                    <p className="text-white font-sans">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                  {/* REQUIREMENTS */}
                  <div className="flex flex-col justify-start width-[80%] ml-5 mt-5 ">
                    <p className="text-white  font-semibold">
                      Here are the requirements:
                    </p>
                    <ul className="list-disc ml-5">
                      <li className="text-white  font-sans">Requirement</li>
                      <li className="text-white  font-sans">Requirement</li>
                      <li className="text-white  font-sans">Requirement</li>
                      <li className="text-white  font-sans">Requirement</li>
                      <li className="text-white  font-sans">Requirement</li>
                    </ul>
                  </div>
                  {/* FORM */}
                  <div className="flex justify-center round-md mt-5">
                    <iframe
                      src="https://docs.google.com/forms/d/e/1FAIpQLSdMlFQIwkYR8LzvYEDySyf-9ZSYDnO9LR3EvPPa5IKC4fBbcw/viewform?usp=sf_link"
                      width="640"
                      height="1000"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default SubmitApplication;
